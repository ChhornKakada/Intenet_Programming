export class KhmerDate {
  private readonly _date: Date;
  constructor(date: Date) {
    this._date = date;
  }
  getDate() {
    return this._date;
  }
  getLabel() {
    const now = new Date()
    let dateSecond: any = Math.floor((now.getTime() - this._date.getTime()) / 1000);
    let label: String = "ពេលក្រោយ"

    if (dateSecond >= 0) {
      label = "មុននេះបន្តិច"
      if (dateSecond / 60 > 1) {
        label = `${Math.floor(dateSecond / 60)} នាទីមុន`
      }
      if (dateSecond / 3600 > 1) {
        label = `${Math.floor(dateSecond / 3600)} ម៉ោងមុន`
      }
      if (dateSecond / 86400 > 1) {
        label = `${Math.floor(dateSecond / 86400)} ថ្ងៃមុន`
      }
      if (dateSecond / 604800 > 1) {
        label = `${Math.floor(dateSecond / 604800)}សប្តាហ៍មុន`
      }

      if (dateSecond / 2629440 > 1) {
        label = `${Math.floor(dateSecond / 2629440)}ខែមុន`
      }
    } else {
      dateSecond = Math.floor((this._date.getTime() - now.getTime()) / 1000);
      label = "ក្រោយនេះបន្តិច"
      if (dateSecond / 60 > 1) {
        label = `${Math.floor(dateSecond / 60)} នាទីក្រោយ`
      }
      if (dateSecond / 3600 > 1) {
        label = `${Math.floor(dateSecond / 3600)} ម៉ោងក្រោយ`
      }
      if (dateSecond / 86400 > 1) {
        label = `${Math.floor(dateSecond / 86400)} ថ្ងៃក្រោយ`
      }
      if (dateSecond / 604800 > 1) {
        label = `${Math.floor(dateSecond / 604800)}សប្តាហ៍ក្រោយ`
      }

      if (dateSecond / 2629440 > 1) {
        label = `${Math.floor(dateSecond / 2629440)}ខែក្រោយ`
      }
    }


    return label
  }
}
