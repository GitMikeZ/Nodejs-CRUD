import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/Rx';
import { Observable } from 'rxjs';

import { Comment } from './comment.model';

@Injectable()
export class CommentService {
	private comments: Comment[] = [];

	constructor(private http: Http) {}

	addComment(comment: Comment) {
		const body = JSON.stringify(comment);
		const headers = new Headers({'Content-type': 'application/json'});
		const token = localStorage.getItem('token')
			? '?token=' + localStorage.getItem('token')
			: '';
		return this.http.post('http://constellations-env.icamfpwgk9.ca-central-1.elasticbeanstalk.com/comment' + token, body, {headers: headers})
				.map((response: Response) => {
					const result = response.json();
					const comment = new Comment(
						result.obj.content,
						result.obj.user.username,
						result.obj.date,
						result.obj._id,
						result.obj.user._id);
						this.comments.push(comment);
						return comment;
				})
				.catch((error: Response) => Observable.throw(error.json()));
	}

	getComments() {
		return this.http.get('http://constellations-env.icamfpwgk9.ca-central-1.elasticbeanstalk.com/comment')
			.map((response: Response) => {
				const comments = response.json().obj;
				let transformedComments: Comment[] = [];
				for( let comment of comments ) {
					transformedComments.push(new Comment(
						comment.content,
						comment.user.username,
						comment.date,
						comment._id,
						comment.user._id)
					);
				}
				this.comments = transformedComments;
				return transformedComments;
			})
			.catch((error: Response) => Observable.throw(error.json()));
	}
}