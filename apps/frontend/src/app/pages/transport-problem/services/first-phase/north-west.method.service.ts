import {Injectable} from '@angular/core';

import {Observable, ReplaySubject} from 'rxjs';

import {
  CalculationProcess,
  TPData,
  TransportTable,
} from '../../transport-problem.types';
import {createResultTableFrom} from '../../utils/result-table.util';
import {checkSolvability} from '../../utils/solvability.util';

@Injectable()
export class NorthWestMethodService {
  public calculate(
    transportProblemData: TPData,
  ): Observable<CalculationProcess> {
    const tpData = transportProblemData;
    if (!checkSolvability(tpData))
      throw new Error('The given problem is not solvable! Try another one.');

    const {costs} = tpData;
    const stocks = [...tpData.storageStocks];
    const demands = [...tpData.shopDemands];

    const process = new ReplaySubject<CalculationProcess>();
    const resultTable: TransportTable = createResultTableFrom(costs);
    let stockIndex = 0,
      demandIndex = 0;

    while (stockIndex < stocks.length && demandIndex < demands.length) {
      const currentStock = stocks[stockIndex] || 0;
      const currentDemand = demands[demandIndex] || 0;
      const transported =
        currentDemand < currentStock ? currentDemand : currentStock;

      resultTable[stockIndex][demandIndex].transported = transported;
      demands[demandIndex] = currentDemand - transported;
      stocks[stockIndex] = currentStock - transported;

      if (currentDemand < currentStock) demandIndex++;
      else stockIndex++;

      process.next({
        transportation: JSON.parse(
          JSON.stringify(resultTable),
        ) as TransportTable,
        demands: [...demands],
        stocks: [...stocks],
      });
    }

    return process.asObservable();
  }
}