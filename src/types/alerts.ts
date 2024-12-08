export interface IAlert {
  showAlert: boolean;
  alertMessage: string;
  alertSeverity: string;
}

export const EMPTY_ALERT: IAlert = {
  showAlert: false,
  alertMessage: '',
  alertSeverity: ''
};
