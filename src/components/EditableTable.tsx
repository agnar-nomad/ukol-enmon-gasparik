import React, { useEffect, useState } from 'react';
import LeftA from '../assets/icons/chevron-left.svg';
import RightA from '../assets/icons/chevron-right.svg';
import { formatDate, formatToISO8601 } from '../helpers/dateFormatters';
import axios from 'axios';
import ReactEditList, * as REL from 'react-edit-list';
import { useEnmonApp } from '../AppContext';
import TableHeaderElement from './TableHeaderElement';

export type TableData = {
  id: number;
  submitted_at: string | null;
  owner: string | null;
  monitored_entity: string | null;
  meter_type: string | null;
  building_floor: number | null;
  manufactured: number | null;
  accessibility: string | null;
};

export type SortOptions = {
  field: string;
  order: string;
};

// This is a schema for the table input data, also describes table headers
const newSchema: REL.Schema = [
  { name: 'id', type: 'id' },
  { name: 'submitted_at', type: 'string' },
  { name: 'owner', type: 'string' },
  { name: 'monitored_entity', type: 'string' },
  {
    name: 'meter_type',
    type: [
      { value: 'heat', name: 'heat' },
      { value: 'water', name: 'water' },
      { value: 'gas', name: 'gas' },
      { value: 'electricity', name: 'electricity' },
      { value: 'cold', name: 'cold' },
      { value: 'other', name: 'other' },
      { value: undefined, name: '' }, //optional value
    ],
  },
  { name: 'building_floor', type: 'number' },
  { name: 'manufactured', type: 'number' },
  { name: 'accessibility', type: 'string' },
];

export function EditableTable() {
  const [page, setPage] = useState<number>(1);
  const [updateError, setUpdateError] = useState<string | null>('');
  const [sortingOptions, setSortingOptions] = useState({
    order: 'asc',
    field: '',
  } as SortOptions);

  // grab the JWT for later use
  const accessToken = localStorage.getItem('accessToken');
  // grab data to manage state using Context
  const { tableData, handleNewTableData } = useEnmonApp();

  // prepare the final visible data for the end user
  // select some fields from the huge response objects
  const newData: TableData[] = tableData.map((entry) => {
    return {
      id: entry.id,
      submitted_at:
        entry['submitted_at'] === null
          ? null
          : formatDate(entry['submitted_at']), // to a familiar format
      owner: entry.owner,
      monitored_entity: entry['monitored_entity'],
      meter_type: entry['meter_type'],
      building_floor: entry['building_floor'],
      manufactured: entry.manufactured,
      accessibility: entry.accessibility,
    };
  });

  // PUT request implementation
  function handleUpdate(item) {
    async function attemptUpdate(item: TableData) {
      try {
        // prepare url and data for sending
        const resourceUrl = import.meta.env.VITE_ENMON_PUT_ROUTE;
        const id = item.id;
        const convertedDate =
          item.submitted_at === null
            ? null
            : formatToISO8601(item.submitted_at); // back to the format that Strapi uses

        const response = await axios.put(
          `${resourceUrl}/${id}`,
          { data: { ...item, submitted_at: convertedDate } },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        console.info('Table line 102: PUT response', response);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log('Axios error message: ', error.message);
          setUpdateError('Error while updating. Try again.');
        } else {
          console.log('unexpected error: ', error);
          setUpdateError('An unexpected error occurred');
        }
      }
    }
    attemptUpdate(item);
  }

  // PAGINATION handlers
  function handlePaginationUp() {
    if (page >= 20) return;
    else {
      setPage((prev) => prev + 1);
    }
  }
  function handlePaginationDown() {
    if (page <= 1) return;
    else {
      setPage((prev) => prev - 1);
    }
  }

  // SORTING implementation
  // clicking the arrow icon on the header will set new data in state, which triggers a re-render and a new API request
  function handleSorting(e: React.MouseEvent<Element, MouseEvent>) {
    const fieldName = (e.target as HTMLElement).dataset.name;
    const newSortingOrder = sortingOptions.order === 'asc' ? 'desc' : 'asc';
    if (fieldName !== undefined) {
      setSortingOptions({ order: newSortingOrder, field: fieldName });
    }
  }

  // General setup to update table data according to sorting or pagination param changes
  // if pagination or sorting parameters saved in state change, this side effect will fire
  useEffect(() => {
    const controller = new AbortController();
    async function sortTable() {
      // assemble the whole url and ask for data
      const resourceLink = import.meta.env.VITE_ENMON_GET_ROUTE;
      const pagination = `pagination[page]=${page}&pagination[pageSize]=25`;
      const sorting = `sort=${sortingOptions.field || 'id'}:${
        sortingOptions.order
      }`;
      const url = `${resourceLink}?${pagination}&${sorting}`;

      try {
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          signal: controller.signal,
        });

        // save new data to state, triggers a re-render
        handleNewTableData(res.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log('error message: ', error.message);
          return error.message;
        } else {
          console.log('unexpected error: ', error);
          return 'An unexpected error occurred';
        }
      }
    }
    sortTable();

    // cleanup
    return () => controller.abort();
  }, [page, sortingOptions]);

  return (
    <>
      {/* error message if present */}
      {updateError && (
        <p style={{ color: 'red' }}>
          There was an error updating this data. Please refresh and try again.
          {updateError}
        </p>
      )}
      {/* pagination */}
      <div className="pagination">
        <span onClick={handlePaginationDown}>
          <img src={LeftA} alt="" />
        </span>
        &nbsp;<span>{page}</span>&nbsp;
        <span onClick={handlePaginationUp}>
          <img src={RightA} alt="" />
        </span>
      </div>
      <figure>
        {/* figure element makes the table X-scrollable */}
        <ReactEditList
          schema={newSchema}
          onLoad={() => newData}
          onUpdate={(item) => {
            console.log('PUT request ');
            handleUpdate(item);
            console.log('UPDATE', item);
          }}
          thClassName="th-bold"
          tdClassName=""
          btnValidateClassName="contrast btn-m"
          btnCancelClassName="contrast outline btn-m"
          disableInsert={true}
          disableDelete={true}
          // Headers are customizable
          headers={{
            submitted_at: (
              <TableHeaderElement
                name="submitted_at"
                sortingOptions={sortingOptions}
                handleClick={handleSorting}>
                Submitted
              </TableHeaderElement>
            ),
            owner: (
              <TableHeaderElement
                name="owner"
                sortingOptions={sortingOptions}
                handleClick={handleSorting}>
                Owner
              </TableHeaderElement>
            ),
            monitored_entity: (
              <TableHeaderElement
                name="monitored_entity"
                sortingOptions={sortingOptions}
                handleClick={handleSorting}>
                Company
              </TableHeaderElement>
            ),
            meter_type: (
              <TableHeaderElement
                name="meter_type"
                sortingOptions={sortingOptions}
                handleClick={handleSorting}>
                Device&nbsp;Type
              </TableHeaderElement>
            ),
            building_floor: (
              <TableHeaderElement
                name="building_floor"
                sortingOptions={sortingOptions}
                handleClick={handleSorting}>
                Floor&nbsp;#
              </TableHeaderElement>
            ),
            manufactured: (
              <TableHeaderElement
                name="manufactured"
                sortingOptions={sortingOptions}
                handleClick={handleSorting}>
                Made&nbsp;in
              </TableHeaderElement>
            ),
            accessibility: (
              <TableHeaderElement
                name="accessibility"
                sortingOptions={sortingOptions}
                handleClick={handleSorting}>
                Accessibility
              </TableHeaderElement>
            ),
          }}
          // We can provide arbitrary props to be passed to the `input` element
          editProps={{
            manufactured: { min: 1970, max: 2023, step: 1 },
            building_floor: { min: -10, max: 40, step: 1 },
          }}
        />
      </figure>
    </>
  );
}
