import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { ResponseWrapper, createRequestOption, UserData } from '../../shared';
import { HOST } from '../../shared/model/request-util';
import { HOST_MVN } from '../../shared/model/request-util';
import { EventBus } from '../../shared/model/functions';
import { CaisseNouvelle } from './caisse-nouvelle.model';
import { AlimentationCaisse } from './alimentation-caisse.model';
import { AlimentationCaisseSfd } from './alimentation-caisse-sfd.model';
import { CaisseNouvelleStatut } from './caisse-nouvelle-statut.model';


@Injectable()
export class CaisseNouvelleService {
    private resourceUrl = HOST + '/api/sfd/create-type-retard-credit';
    private resourceSearchUrl = HOST + '/api/_search/account-types';
    //private createCaisseUrl = HOST + '/api/user/add-caisse?';
    private createCaisseUrl = HOST_MVN + '/api/user/add-caisse';
    private getInfosCaisseUrl = HOST + '/api/sfd/liste-caisse-agence';
    private getListeCaisseUrl = HOST + '/api/sfd/liste-caisse-agence';
    private alimenterCaisseAgenceUrl = HOST + '/api/sfd/alimentation-caisse-agence';
    private alimenterCaisseSfdUrl = HOST + '/api/sfd/alimentation-caisse-agence';
    private soldeCaisseUrl = HOST + '/api/sfd/affiche-solde-caisse';
    private statutCaisseUrl = HOST + '/api/sfd/update-caisse-etat';


    // http://185.98.137.71:8787/api/sfd/info-caisse-agence?agence_reference=0000AG13&codecaisse=000CAIS3

    constructor(private http: Http) { }

    create(caisseNouvelle: CaisseNouvelle): Observable<CaisseNouvelle> {
        const copy = this.convert(caisseNouvelle);
        console.log(copy);
        console.log(caisseNouvelle);
        const options = createRequestOption({
            name:caisseNouvelle.libelle,
            first_name:caisseNouvelle.firstname,
            username:caisseNouvelle.username,
            tel:caisseNouvelle.telephone,
            password:caisseNouvelle.password,
            email:caisseNouvelle.email,
            agence_reference:caisseNouvelle.agenceReference,
            created_by:UserData.getInstance().userReference,
            retraitmax:caisseNouvelle.retraitMaxAmount,
            soldemax:copy.soldetMaxAmount,
            comptecarmes:copy.compteCarmes
        });
        
        return this.http
            .get(this.createCaisseUrl, options).catch((res: Response) => { if (res.status == 401) EventBus.publish('NOT_AUTHORIZED', true); return Observable.throw(res); })
            .map((res: Response) => {
                return res.json();
            });
    }

    update(caisseNouvelle: CaisseNouvelle): Observable<CaisseNouvelle> {
        const copy = this.convert(caisseNouvelle);
        const options = createRequestOption();
        return this.http
            .put(this.resourceUrl, copy, options).catch((res: Response) => { if (res.status == 401) EventBus.publish('NOT_AUTHORIZED', true); return Observable.throw(res); })
            .map((res: Response) => {
                return res.json();
            });
    }

    find(id: number): Observable<CaisseNouvelle> {
        const options = createRequestOption();
        return this.http
            .get(`${this.resourceUrl}/${id}`, options).catch((res: Response) => { if (res.status == 401) EventBus.publish('NOT_AUTHORIZED', true); return Observable.throw(res); })
            .map((res: Response) => {
                return res.json();
            });
    }

    queryTest(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(Object.assign({}, req, {
            NO_QUERY: true,
            'sfdReference.equals': UserData.getInstance().getSFDReference()
        }));
        return this.http
            .get(this.getInfosCaisseUrl, options).catch((res: Response) => { if (res.status == 401) EventBus.publish('NOT_AUTHORIZED', true); return Observable.throw(res); })
            .map((res: Response) => this.convertResponse(res));
    }

    // http://185.98.137.71:8787/api/sfd/liste-caisse-agence?agence_reference=0000AG13&codecaisse=
    query(req?: any, agence_reference? : any, codeCaisse?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(Object.assign({}, req, {
            NO_QUERY: true,
            agence_reference,
            codecaisse:codeCaisse,
            'sfdReference.equals': UserData.getInstance().getSFDReference()
        }));
        return this.http
            .get(this.getListeCaisseUrl, options).catch((res: Response) => { if (res.status == 401) EventBus.publish('NOT_AUTHORIZED', true); return Observable.throw(res); })
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        const options = createRequestOption();
        return this.http.delete(`${this.resourceUrl}/${id}`, options).catch((res: Response) => { if (res.status == 401) EventBus.publish('NOT_AUTHORIZED', true); return Observable.throw(res); });
    }


    // http://185.98.137.71:8787/api/sfd/alimentation-caisse-agence?comptecarmeagence=789685742&comptecarmescaisse=786685742&montant=500000
    alimenterCaisseAgence(alimentationCaisse: AlimentationCaisse): Observable<any> {
       
        const options = createRequestOption({
            comptecarmeagence: alimentationCaisse.comptecarmeagence,
            comptecarmescaisse: alimentationCaisse.comptecarmescaisse,
            montant: alimentationCaisse.montant
        });
        return this.http
            .get(this.alimenterCaisseAgenceUrl, options).catch((res: Response) => { if (res.status == 401) EventBus.publish('NOT_AUTHORIZED', true); return Observable.throw(res); })
            .map((res: Response) => {
                return res.json();
            });
    }

    // http://185.98.137.71:8787/api/sfd/alimentation-agence-sfd?comptecarmeagence=789685742&comptecarmessfd=014674251453653&montant=500000
    alimenterCaisseSfd(alimentationCaisseSfd: AlimentationCaisseSfd): Observable<any> {
        
        const options = createRequestOption({
            comptecarmeagence: alimentationCaisseSfd.comptecarmeagence,
            comptecarmessfd:alimentationCaisseSfd.comptecarmessfd,
            montant: alimentationCaisseSfd.montant
        });
        return this.http
            .get(this.alimenterCaisseSfdUrl, options).catch((res: Response) => { if (res.status == 401) EventBus.publish('NOT_AUTHORIZED', true); return Observable.throw(res); })
            .map((res: Response) => {
                return res.json();
            });
    }

    // http://185.98.137.71:8787/api/sfd/affiche-solde-caisse?comptecarmescaisse=014674251453653
    soldeCaisse(compteCarmesCaisse: number): Observable<any> {
        
        const options = createRequestOption({
            comptecarmescaisse: compteCarmesCaisse
        });
        return this.http
            .get(this.soldeCaisseUrl, options).catch((res: Response) => { if (res.status == 401) EventBus.publish('NOT_AUTHORIZED', true); return Observable.throw(res); })
            .map((res: Response) => {
                console.log(res);
                console.log(res.json());
                return res.json();
            });
    }


    // http://185.98.137.71:8787/api/sfd/update-caisse-etat?id=15&etat=OUVERT
    statutCaisse(caisseNouvelleStatut: CaisseNouvelleStatut): Observable<any> {
        
        const options = createRequestOption({
            id: caisseNouvelleStatut.id,
            etat: caisseNouvelleStatut.etat
        });
        return this.http
            .get(this.statutCaisseUrl, options).catch((res: Response) => { if (res.status == 401) EventBus.publish('NOT_AUTHORIZED', true); return Observable.throw(res); })
            .map((res: Response) => {
                console.log(res);
                console.log(res.json());
                return res.json();
            });
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

    private convert(caisseNouvelle: CaisseNouvelle): CaisseNouvelle {
        const copy: CaisseNouvelle = Object.assign({}, caisseNouvelle);
        return copy;
    }




}
