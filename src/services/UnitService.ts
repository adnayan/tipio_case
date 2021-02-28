import { issetOrEmpty } from "../helpers/General";
import { PageInfoType } from "../types/PageInfoType";
import { UnitCardType } from "../types/UnitCardType";
import { Service } from "./Service";

export class UnitService extends Service {
  async fetchUnit(query: string, type: string): Promise<any> {
    try {
      let url: string;
      if (type === "number") {
        url = this.makeUrl("enheter?organisasjonsnummer=" + query);
      } else {
        url = this.makeUrl("enheter?navn=" + query);
      }
      const data = await fetch(url);
      const json = await data.json();
      const page = json.page;
      const links = json._links;
      const pageInfo: PageInfoType = {
        number: page.number,
        size: page.size,
        totalElements: page.totalElements,
        totalPages: page.totalPages,
        firstPage: issetOrEmpty(links.first, ""),
        lastPage: issetOrEmpty(links.last, ""),
        currentPage: links.self.href,
        nextPage: issetOrEmpty(links.next, ""),
        previousPage: issetOrEmpty(links.prev, ""),
      };

      if (json._embedded !== undefined) {
        const cards = json._embedded.enheter;
        const cardArr: Array<UnitCardType> = new Array<UnitCardType>();
        cards.forEach((el: any) => {
          const tmp: UnitCardType = {
            name: el.navn,
            organizationNumber: el.organisasjonsnummer,
            description: el.organisasjonsform.beskrivelse,
            bankrupt: el.konkurs,
            link: el._links.self.href,
          };
          cardArr.push(tmp);
        });

        return { pageInfo: pageInfo, cardArr: cardArr };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async paginate(url: string) {
    try {
      const data = await fetch(url);
      const json = await data.json();
      return json;
    } catch (error) {
      console.log(error);
    }
  }
}
