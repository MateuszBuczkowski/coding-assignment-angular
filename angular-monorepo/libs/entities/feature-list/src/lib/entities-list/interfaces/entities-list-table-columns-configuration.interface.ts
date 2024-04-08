export interface EntitiesListTableColumnConfiguration {
  columnName: string;
  canUserSetVisibility: boolean;
  isVisible: boolean;
  fieldKey: string;
}

export const defaultEntitiesListTableColumnsConfiguration: EntitiesListTableColumnConfiguration[] = [
  {
    columnName: 'Entity Id',
    canUserSetVisibility: false,
    isVisible: false,
    fieldKey: 'entityId'
  },
  {
    columnName: 'Tracking Id',
    canUserSetVisibility: true,
    isVisible: true,
    fieldKey: 'trackingId'
  },
  {
    columnName: 'Name',
    canUserSetVisibility: true,
    isVisible: true,
    fieldKey: 'name'
  },
  {
    columnName: 'Entity Type',
    canUserSetVisibility: true,
    isVisible: true,
    fieldKey: 'entityType'
  },
  {
    columnName: 'Entity Status',
    canUserSetVisibility: true,
    isVisible: true,
    fieldKey: 'entityStatus'
  },
  {
    columnName: 'Is Active',
    canUserSetVisibility: true,
    isVisible: true,
    fieldKey: 'isActive'
  }
];
