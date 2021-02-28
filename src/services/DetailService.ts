import { DetailType } from "../types/DetailType";
import { Service } from "./Service";

export class DetailService extends Service {
  async fetchDetail(orgNum: number): Promise<any> {
    try {
      if (typeof orgNum === "number") {
        const url: string = this.makeUrl("enheter/" + orgNum);
        const response = await fetch(url);
        if (response.status === 200) {
          const data = await response.json();
          let result: DetailType = {
            organizationNumber: data.organisasjonsnummer,
            organizationName: data.navn,
            organizationFormDescription: data.organisasjonsform.beskrivelse,
            registrationDate: data.registreringsdatoEnhetsregisteret,
            numberOfEmployee: data.antallAnsatte,
            country: data.forretningsadresse.land,
            countryCode: data.forretningsadresse.landkode,
            postCode: data.forretningsadresse.postnummer,
            postOffice: data.forretningsadresse.poststed,
            address: data.forretningsadresse.adresse,
            municipality: data.forretningsadresse.kommune,
            municipalityNumber: data.forretningsadresse.kommunenummer,
            establishedDate: data.stiftelsesdato,
            institutionSectorCode: data.institusjonellSektorkode.kode,
            institutionSectorDescription:
              data.institusjonellSektorkode.beskrivelse,
            bankruptcy: data.konkurs,
            maalform: data.maalform,
            sourceUrl: data._links.self.href,
          };

          return result;
        }
        if (response.status === 400) {
          alert("Unable to fetch data. Please try again later.");
        }
      } else {
        alert(
          `Invalid argument organization number. Parameter of number is required but ${typeof orgNum} is given.`
        );
      }
    } catch (error) {
      alert("Something went terribely wrong. Please try again later.");
    }
  }
}
