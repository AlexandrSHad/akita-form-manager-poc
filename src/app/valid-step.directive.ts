import { Directive, Attribute, ElementRef } from '@angular/core';
import { AkitaNgFormsManager } from '@datorama/akita-ng-forms-manager';
import { combineLatest } from 'rxjs';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { startWith, distinctUntilChanged } from 'rxjs/operators';

// NOTISE:
// * we can use any (either the ui framework) component's selectors to bind this directive to.
//   so we shouldn't change the ui framework source code

@Directive({
  selector: '[validStep]'
})
export class ValidStepDirective {
  constructor(
    @Attribute('validStep') private step,
    private formsManager: AkitaNgFormsManager<any>,
    private host: ElementRef<HTMLElement>
  ) {}

  ngOnInit() {
    const step = `step${captiliaze(this.step)}`;
    console.log('validStep init: ', step);
    const isStepValid$ = this.formsManager.selectValid(step).pipe(distinctUntilChanged());
    const isStepDirty$ = this.formsManager.selectDirty(step).pipe(distinctUntilChanged());

    combineLatest(isStepDirty$, isStepValid$)
      .pipe(untilDestroyed(this))
      .subscribe(([isDirty, isValid]) => {
        if (isDirty) {
          this.host.nativeElement.classList.toggle('invalid', !isValid);
        }
      });
  }

  ngOnDestroy(): void {}
}

function captiliaze(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
