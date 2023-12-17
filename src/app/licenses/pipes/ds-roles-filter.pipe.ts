import { Pipe, PipeTransform } from '@angular/core';
import { License } from '../interfaces/license';

@Pipe({
  name: 'filterDsRoles',
  pure: false,
})
export class FilterDsRolesPipe implements PipeTransform {
  transform(licenses: License[], dsRoles: string[]): License[] {
    if (!dsRoles.length || !licenses) return licenses;

    return licenses.filter((lic) => {
      const allRoles = [...lic.discord.roles.map((r) => r.id), ...dsRoles];

      return this.getUniqArr(allRoles).length !== allRoles.length;
    });
  }

  getUniqArr<T>(arr: T[]) {
    return [...new Set(arr)];
  }
}
