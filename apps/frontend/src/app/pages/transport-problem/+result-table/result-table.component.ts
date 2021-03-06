import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

import {CalculationProcess} from '@opres/shared-interfaces';

@Component({
  selector: 'result-table[result]',
  templateUrl: './result-table.template.html',
  styleUrls: ['./result-table.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultTableComponent {
  @Input() title: string | undefined;
  @Input() result: CalculationProcess | undefined;

  get demands() {
    if (!this.result) return [];
    return [
      this.result.demands.reduce(
        (acc, curr, index) => ({...acc, [`${index}`]: curr || 0}),
        {},
      ),
    ];
  }

  get stocks() {
    if (!this.result) return [];
    return this.result.stocks.map((stock) => ({'0': stock}));
  }
}
