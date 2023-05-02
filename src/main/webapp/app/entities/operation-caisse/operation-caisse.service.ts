import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { OperationCaisse } from './operation-caisse.model';
import { ResponseWrapper, createRequestOption, UserData } from '../../shared';
import { HOST } from '../../shared/model/request-util';
import { EventBus } from '../../shared/model/functions';


@Injectable()
export class OperationCaisseService {
  private resourceUrl = HOST + '/api/sfd/';
  private resourceSearchUrl = HOST + '/api/_search/account-types';
  private resourceEpargneUrl = HOST + '/apisfd/ouverture-compte-epargne?';
  private resourceDepotCaisseUrl = HOST + '/api/sfd/depot-caisse?';
  private resourceRetraitCaisseUrl = HOST + '/api/sfd/retrait-caisse?';
  private resourceVirememntCaisseUrl = HOST + '/api/sfd/virement-caisse-a-caisse?';
  private resourceEncaissementUrl = HOST + '/api/sfd/encaissement-divers?';
  private resourceDecaissentUrl = HOST + '/api/sfd/decaissement-divers?';

  constructor(private http: Http) { }

  // http://185.98.137.71:8787/api/sfd/ouverture-compte-epargne?comptecarmescaisse=96587481&montant=10000&comptecarmesclient=96587481
  //&produitid=1&email=jojopo1@gmail.com&phone=96574785&sexe=M&typeClientid=11&agence_reference=0000AG13&profession_id=1
  //&birthday=2023-04-10&nomClient=luc&nationalite_id=1


  ouvertureCompteEpargne(operationCaisse: OperationCaisse): Observable<any> {
    const copy = this.convert(operationCaisse);
    console.log(copy);
    console.log(operationCaisse);
    const options = createRequestOption();
    return this.http
        .get(this.resourceEpargneUrl +
            `comptecarmescaisse=${copy.comptecarmescaisse}`
            + `&montant=${copy.montant}` + `&comptecarmesclient=${copy.comptecarmesclient}`
            + `&produitid=${copy.produitId}` + `&email=${copy.email}`
            + `&phone=${copy.telephone}` + `&sexe=${copy.sexe}`
            + `&typeClientid=${copy.typeClientId}` + `&agence_reference=${copy.agenceReference}`
            + `&profession_id=${copy.professionId}` + `&birthday=${copy.birthDate}`
            + `&nomClient=${copy.nomClient}` + `&nationalite_id=${copy.nationalityId}`
            , options).catch((res: Response) => { if (res.status == 401) EventBus.publish('NOT_AUTHORIZED', true); return Observable.throw(res); })
        .map((res: Response) => {
            return res.json();
        });
}

// http://185.98.137.71:8787/api/sfd/depot-caisse?comptecarmescaisse=96587481&montant=10000&comptecarmesclient=96587481
//&created_by=1&email=jojopo1%40gmail.com&phone=96574785&sexe=M&typeClientid=11&agence_reference=0000AG13&profession_id=1
//&birthday=2023-04-10&nomClient=luc&nationalite_id=1

depotCaisse(operationCaisse: OperationCaisse): Observable<any> {
    const copy = this.convert(operationCaisse);
    console.log(copy);
    console.log(operationCaisse);
    const options = createRequestOption();
    return this.http
        .get(this.resourceDepotCaisseUrl +
            `comptecarmescaisse=${copy.comptecarmescaisse}`
            + `&montant=${copy.montant}` + `&comptecarmesclient=${copy.comptecarmesclient}`
            + `&created_by=${copy.montant}` + `&email=${copy.email}`
            + `&phone=${copy.telephone}` + `&sexe=${copy.sexe}`
            + `&typeClientid=${copy.typeClientId}` + `&agence_reference=${copy.agenceReference}`
            + `&profession_id=${copy.professionId}` + `&birthday=${copy.birthDate}`
            + `&nomClient=${copy.nomClient}` + `&nationalite_id=${copy.nationalityId}`
            , options).catch((res: Response) => { if (res.status == 401) EventBus.publish('NOT_AUTHORIZED', true); return Observable.throw(res); })
        .map((res: Response) => {
            return res.json();
        });
}


// http://185.98.137.71:8787/api/sfd/virement-caisse-a-caisse?comptecarmescaisseenvoi=96587481&montant=10000
// &comptecarmescaisserecu=96587481&created_by=1&email=lolo@gmail.com&phone=96574785&sexe=M&typeClientid=11
// &agence_reference=0000AG13&profession_id=1&birthday=2023-04-10&nomClient=luc&nationalite_id=1

virementCaisseToCaisse(operationCaisse: OperationCaisse): Observable<any> {
    const copy = this.convert(operationCaisse);
    console.log(copy);
    console.log(operationCaisse);
    const options = createRequestOption();
    return this.http
        .get(this.resourceVirememntCaisseUrl +
            `comptecarmescaisseenvoi=${copy.comptecarmescaisseenvoi}`
            + `&montant=${copy.montant}` + `&comptecarmescaisserecu=${copy.comptecarmescaisserecu}`
            + `&created_by=${copy.montant}` + `&email=${copy.email}`
            + `&phone=${copy.telephone}` + `&sexe=${copy.sexe}`
            + `&typeClientid=${copy.typeClientId}` + `&agence_reference=${copy.agenceReference}`
            + `&profession_id=${copy.professionId}` + `&birthday=${copy.birthDate}`
            + `&nomClient=${copy.nomClient}` + `&nationalite_id=${copy.nationalityId}`
            , options).catch((res: Response) => { if (res.status == 401) EventBus.publish('NOT_AUTHORIZED', true); return Observable.throw(res); })
        .map((res: Response) => {
            return res.json();
        });
}

// http://185.98.137.71:8787/api/sfd/retrait-caisse?comptecarmescaisse=96587481&montant=10000&comptecarmesclient=96587481&created_by=1


retraitCaisse(operationCaisse: OperationCaisse): Observable<any> {
    const copy = this.convert(operationCaisse);
    console.log(copy);
    console.log(operationCaisse);
    const options = createRequestOption();
    return this.http
        .get(this.resourceRetraitCaisseUrl +
            `comptecarmescaisse=${copy.comptecarmescaisse}`
            + `&montant=${copy.montant}` + `&comptecarmesclient=${copy.comptecarmesclient}`
            + `&created_by=${UserData.getInstance().userReference}`
            , options).catch((res: Response) => { if (res.status == 401) EventBus.publish('NOT_AUTHORIZED', true); return Observable.throw(res); })
        .map((res: Response) => {
            return res.json();
        });
}

// http://185.98.137.71:8787/api/sfd/encaissement-divers?comptecarmescaisse=96587481&montant=10000&motif=Rien&created_by=1

encaissement(operationCaisse: OperationCaisse): Observable<any> {
    const copy = this.convert(operationCaisse);
    console.log(copy);
    console.log(operationCaisse);
    const options = createRequestOption();
    return this.http
        .get(this.resourceEncaissementUrl +
            `comptecarmescaisse=${copy.comptecarmescaisse}`
            + `&montant=${copy.montant}` + `&motif=${copy.motif}`
            + `&created_by=${UserData.getInstance().userReference}`
            , options).catch((res: Response) => { if (res.status == 401) EventBus.publish('NOT_AUTHORIZED', true); return Observable.throw(res); })
        .map((res: Response) => {
            return res.json();
        });
}


// http://185.98.137.71:8787/api/sfd/decaissement-divers?comptecarmescaisse=96587481&montant=10000&motif=Rien&created_by=1
decaissement(operationCaisse: OperationCaisse): Observable<any> {
    const copy = this.convert(operationCaisse);
    console.log(copy);
    console.log(operationCaisse);
    const options = createRequestOption();
    return this.http
        .get(this.resourceDecaissentUrl +
            `comptecarmescaisse=${copy.comptecarmescaisse}`
            + `&montant=${copy.montant}` + `&motif=${copy.motif}`
            + `&created_by=${UserData.getInstance().userReference}`
            , options).catch((res: Response) => { if (res.status == 401) EventBus.publish('NOT_AUTHORIZED', true); return Observable.throw(res); })
        .map((res: Response) => {
            return res.json();
        });
}

  create(OperationCaisse: OperationCaisse): Observable<OperationCaisse> {
    const copy = this.convert(OperationCaisse);
    const options = createRequestOption();
    return this.http
      .post(this.resourceUrl, copy, options).catch((res: Response) => { if (res.status == 401) EventBus.publish('NOT_AUTHORIZED', true); return Observable.throw(res); })
      .map((res: Response) => {
        return res.json();
      });
  }

  update(OperationCaisse: OperationCaisse): Observable<OperationCaisse> {
    const copy = this.convert(OperationCaisse);
    const options = createRequestOption();
    return this.http
      .put(this.resourceUrl, copy, options).catch((res: Response) => { if (res.status == 401) EventBus.publish('NOT_AUTHORIZED', true); return Observable.throw(res); })
      .map((res: Response) => {
        return res.json();
      });
  }

  find(id: number): Observable<OperationCaisse> {
    const options = createRequestOption();
    return this.http
      .get(`${this.resourceUrl}/${id}`, options).catch((res: Response) => { if (res.status == 401) EventBus.publish('NOT_AUTHORIZED', true); return Observable.throw(res); })
      .map((res: Response) => {
        return res.json();
      });
  }

  query(req?: any): Observable<ResponseWrapper> {
    const options = createRequestOption(Object.assign({}, req, {
      NO_QUERY: true,
      'sfdReference.equals': UserData.getInstance().getSFDReference()
    }));
    return this.http
      .get(this.resourceUrl, options).catch((res: Response) => { if (res.status == 401) EventBus.publish('NOT_AUTHORIZED', true); return Observable.throw(res); })
      .map((res: Response) => this.convertResponse(res));
  }

  delete(id: number): Observable<Response> {
    const options = createRequestOption();
    return this.http.delete(`${this.resourceUrl}/${id}`, options).catch((res: Response) => { if (res.status == 401) EventBus.publish('NOT_AUTHORIZED', true); return Observable.throw(res); });
  }

  search(req?: any): Observable<ResponseWrapper> {
    const options = createRequestOption(req);
    return this.http
      .get(this.resourceSearchUrl, options).catch((res: Response) => { if (res.status == 401) EventBus.publish('NOT_AUTHORIZED', true); return Observable.throw(res); })
      .map((res: any) => this.convertResponse(res));
  }

  private convertResponse(res: Response): ResponseWrapper {
    const jsonResponse = res.json();
    return new ResponseWrapper(res.headers, jsonResponse, res.status);
  }

  private convert(OperationCaisse: OperationCaisse): OperationCaisse {
    const copy: OperationCaisse = Object.assign({}, OperationCaisse);
    return copy;
  }
}