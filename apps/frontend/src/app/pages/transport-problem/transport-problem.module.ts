import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

import {InfoCardModule} from '@components/info-card/info-card.module';
import {TranslateModule} from '@ngx-translate/core';

import {BadgedTableModule} from './+badged-table/badged-table.module';
import {ResultTableModule} from './+result-table/result-table.module';
import {TransportTableModule} from './+table/transport-table.module';
import {NorthWestMethodService} from './services/first-phase/north-west.method.service';
import {TableMinimumMethodService} from './services/first-phase/table-minimum.method.service';
import {VogelKordaMethodService} from './services/first-phase/vogel-korda.method.service';
import {SecondPhaseService} from './services/second-phase.service';
import {TransportProblemPageComponent} from './transport-problem.page';
import {TransportProblemRouting} from './transport-problem.routing';
import {TransportProblemService} from './transport-problem.service';

@NgModule({
  declarations: [TransportProblemPageComponent],
  imports: [
    BadgedTableModule,
    CommonModule,
    InfoCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ResultTableModule,
    TranslateModule,
    TransportProblemRouting,
    TransportTableModule,
    ReactiveFormsModule,
  ],
  providers: [
    SecondPhaseService,
    NorthWestMethodService,
    TableMinimumMethodService,
    TransportProblemService,
    VogelKordaMethodService,
  ],
})
export class TransportProblemModule {}
