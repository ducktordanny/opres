import {Injectable} from '@angular/core';

import {Table} from '@opres/generatable-tables';

@Injectable()
export class AssignmentProblemService {
  public calculate(assignmentTable: Table): Table {
    /** First Phase */
    const table = this.reductionByRows([...assignmentTable]);
    return this.reductionByColumns(table);

    /** Second Phase */
  }

  private reductionByRows(table: Table): Table {
    for (const [index, row] of table.entries()) {
      const rowElements = Object.values(row) as Array<number>;
      const minimumOfRow = Math.min(...rowElements);
      for (const [key, value] of Object.entries(row))
        table[index][+key] = (value || 0) - minimumOfRow;
    }
    return table;
  }

  private reductionByColumns(table: Table): Table {
    for (let index = 0; index < table.length; index++) {
      const columnElements = table.map((value) => value[index] || 0);
      const minimumOfColumn = Math.min(...columnElements);
      for (const element of table)
        element[index] = (element[index] || 0) - minimumOfColumn;
    }
    return table;
  }
}
