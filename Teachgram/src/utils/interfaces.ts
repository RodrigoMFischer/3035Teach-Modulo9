export interface Login {
	email: string;
	password: string;
}

export interface LoginResponse {
	id: number;
	token: string;
	message?: string;
}

export interface Register {
	name: string;
	username: string;
	email: string;
	password: string;
	phone: string;
	description: string;
	profileLink: string;
	deleted: boolean
}

export interface User extends Register{
	userId: number;
	createdAt: string;
	updatedAt: string;
}

export interface Post {
	postId: number;
	title: string;
	description: string;
	photoLink: string;
	videoLink: string;
	isPrivate: boolean;
	createdAt: string;
	updatedAt: string;
	message?: string
}

export interface Publication {
	postId: number;
	title: string;
	description: string;
	photoLink: string;
	videoLink: string;
	isPrivate: boolean;
	createdAt: string;
	updatedAt: string;
	message?: string
	username: string;
	profileLink: string;
}
 
export interface Publications{
	totalElements: number;
	totalPages: number;
	page: number;
	size: number;
	content: Publication[];
}

export interface NewPost {
	title: string;
	description: string;
	photoLink: string;
	videoLink?: string;
	isPrivate: boolean
}