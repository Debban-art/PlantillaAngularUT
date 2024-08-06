export interface ConfigCampos {
    label: string;
    placeholder: string;
    formControlName: string;
    validators: any[];
    type: 'input' | 'select';
    options?: {value: string | number; viewValue: string}[];
    defaultValue?: any; // Nuevo campo para valores predeterminados
}
