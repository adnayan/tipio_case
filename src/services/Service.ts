export class Service {
  baseUrl: string = "https://data.brreg.no/enhetsregisteret/api/";

  makeUrl(subUrl: string): string {
    return this.baseUrl + subUrl;
  }
}
