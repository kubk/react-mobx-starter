import { makeAutoObservable } from 'mobx';

export class TextInput {
  constructor(public value = '') {
    makeAutoObservable(this);
  }

  private onChange = (e: { currentTarget: { value: string } }) => {
    this.value = e.currentTarget.value;
  };

  setValue = (value: string) => {
    this.value = value;
  };

  get toInput() {
    return { value: this.value, onChange: this.onChange };
  }
}

export class CheckboxInput {
  constructor(public checked: boolean) {
    makeAutoObservable(this);
  }

  toggle = () => {
    this.checked = !this.checked;
  };

  setValue = (value: boolean) => {
    this.checked = value;
  };

  onChange = (event: { currentTarget: { checked: boolean } }) => {
    this.checked = event.currentTarget.checked;
  };

  get toInput() {
    return { checked: this.checked, onChange: this.onChange };
  }
}
