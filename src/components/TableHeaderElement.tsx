import React, { ReactNode } from 'react';
import ArrowUp from '../assets/icons/arrow-up.svg';
import ArrowDown from '../assets/icons/arrow-down.svg';
import { SortOptions } from './EditableTable';

interface TableHeaderElementProps {
  name: string;
  children: string | ReactNode;
  sortingOptions: SortOptions;
  handleClick: React.MouseEventHandler<Element>;
}

// a custom element that will be used in the th of the table columns
function TableHeaderElement({
  name,
  handleClick,
  children,
  sortingOptions,
}: TableHeaderElementProps) {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexWrap: 'nowrap',
          alignItems: 'center',
          // different styling of the selected (sorted) column 👇
          fontStyle: `${name === sortingOptions.field ? 'italic' : ''}`,
          borderBottom: `${
            name === sortingOptions.field ? '1px dotted pink' : 'none'
          }`,
        }}>
        <span>{children}</span>
        <span>
          <img
            style={{
              width: '22px',
              height: '22px',
              cursor: 'pointer',
              marginInline: '15px',
            }}
            // data attribute used to pass correct keys to the sorting update funtion
            // this is passed on to the fn and then the API query to return sorted data
            data-name={name}
            onClickCapture={(e: React.MouseEvent<Element, MouseEvent>): void =>
              handleClick(e)
            }
            src={sortingOptions.order === 'asc' ? ArrowUp : ArrowDown}
          />
        </span>
      </div>
    </>
  );
}

export default TableHeaderElement;
