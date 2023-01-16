import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ActorService {

	constructor(private http: HttpClient) { }

	getTopRatedActors(page = 1): Observable<any> {
	return this.http.get<any>(
		`${environment.baseUrl}/person/popular?api_key=${environment.apiKey}&page=${page}`
	);
	}

	getActorDetails(id: string) {
		return this.http.get(
			`${environment.baseUrl}/person/${id}?api_key=${environment.apiKey}`
		);
	}

	getMovieCredits(id: string) {
		return this.http.get(
			`${environment.baseUrl}/person/${id}/movie_credits?api_key=${environment.apiKey}`
		)
	}
}
