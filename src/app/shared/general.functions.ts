export class GeneralFunctions {

    constructor(){}

  static formatDate(date: Date| undefined ) {
      const d = new Date(date?? new Date());
      let month = '' + (d.getMonth() + 1);
      let day = '' + d.getDate();
      const year = d.getFullYear();
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      return [year, month, day].join('-');
   }
}