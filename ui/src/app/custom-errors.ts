import { ErrorMessage } from "ng-bootstrap-form-validation";

export const CUSTOM_ERRORS: ErrorMessage[] = [
    {
        error: "required",
        format: requiredFormat
    },
    {
        error: "email",
        format: emailFormat
    },
    {
        error: "minlength",
        format: minlengthFormat
    },
    {
        error: "maxlength",
        format: maxlengthFormat
    }
];

export function requiredFormat(label: string, error: any): string {
    return `${label} es requerido.`;
}

export function emailFormat(label: string, error: any): string {
    return `Dirección de correo electrónico no válida.`;
}

export function minlengthFormat(label: string, error: any): string {
    return `${label} debe tener al menos ${error.requiredLength} caracteres.`;
}

export function maxlengthFormat(label: string, error: any): string {
    return `${label} no debe tener mas de ${error.requiredLength} caracteres.`;
}
