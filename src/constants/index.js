import { db } from '../database/config/db';

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR'
export const USER_LOGOUT = 'USER_LOGOUT'

export const SET_PROJECTS_SUCCESS = 'SET_PROJECTS_SUCCESS'
export const SET_PROJECTS_PENDING = 'SET_PROJECTS_PENDING'
export const SET_PROJECTS_ERROR = 'SET_PROJECTS_ERROR'
export const UPDATE_STATE_PROJECTS = 'UPDATE_STATE_PROJECTS'
export const SET_CURRENT_PROJECT = 'SET_CURRENT_PROJECT'

export const ADD_PROJECT = 'ADD_PROJECT'
export const UPDATE_PROJECT = 'UPDATE_PROJECT'
export const REMOVE_PROJECT = 'REMOVE_PROJECT'
export const CLEAR_CURRENT_PROJECT = 'CLEAR_CURRENT_PROJECT'

export const GET_ALL_FETCH_JOBS = 'GET_ALL_FETCH_JOBS'
export const SET_FETCH_JOBS_PENDING = 'SET_FETCH_JOBS_PENDING'
export const SET_FETCH_JOBS_SUCCESS = 'SET_FETCH_JOBS_SUCCESS'
export const SET_FETCH_JOBS_ERROR = 'SET_FETCH_JOBS_ERROR'
export const SET_CURRENT_FETCH_JOB = 'SET_CURRENT_FETCH_JOB'
export const SET_RUNNING_FETCH_JOB = 'SET_RUNNING_FETCH_JOB'

export const ADD_FETCH_JOB = 'ADD_FETCH_JOB'
export const UPDATE_FETCH_JOB_STATUS = 'UPDATE_FETCH_JOB_STATUS'
export const REMOVE_FETCH_JOB = 'REMOVE_FETCH_JOB'

export const CLEAR_CURRENT_FETCH_JOB = 'CLEAR_CURRENT_FETCH_JOB'

export const SET_INFLUENCERS_SUCCESS = 'GET_ALL_INFLUENCERS_SUCCESS'
export const SET_INFLUENCERS_PENDING = 'GET_ALL_INFLUENCERS_PENDING'
export const SET_INFLUENCERS_ERROR = 'GET_ALL_INFLUENCERS_ERROR'
export const SET_CURRENT_INFLUENCER = 'SET_CURRENT_INFLUENCER'

export const DB_USER_REF = db.ref('Users/');
export const DB_USER_PROJECTS_REF = user_id => db.ref(`Users/${user_id}/Projects`);
export const DB_PROJECT_FETCH_JOBS_REF = (user_id, project_id) => db.ref(`Users//${user_id}/Projects/${project_id}/FetchJobs`);

export const DB_FETCH_JOBS_REF = 'FETCHJOBS'
export const DB_INFLUENCERS_REF = 'INFLUENCERS'

export const GET_MEDIA_BY_HASHTAG_SUCCESS = 'GET_MEDIA_BY_HASHTAG_SUCCESS'
export const GET_MEDIA_BY_HASHTAG_ERROR = 'GET_MEDIA_BY_HASHTAG_ERROR'
export const GET_MEDIA_BY_HASHTAG_PENDING = 'GET_MEDIA_BY_HASHTAG_PENDING'
export const GET_NEXT_PAGE_SUCCESS = 'GET_NEXT_PAGE_SUCCESS'
export const GET_NEXT_PAGE_ERROR = 'GET_NEXT_PAGE_ERROR'
export const GET_NEXT_PAGE_PENDING = 'GET_NEXT_PAGE_PENDING'
export const GET_USER_BY_ID_SUCCESS = 'GET_USER_BY_ID_SUCCESS'
export const GET_USER_BY_ID_ERROR = 'GET_USER_BY_ID_ERROR'
export const GET_USER_BY_ID_PENDING = 'GET_USER_BY_ID_PENDING'
export const GET_USER_BY_USERNAME_SUCCESS = 'GET_USER_BY_USERNAME_SUCCESS'
export const GET_USER_BY_USERNAME_ERROR = 'GET_USER_BY_USERNAME_ERROR'
export const GET_USER_BY_USERNAME_PENDING = 'GET_USER_BY_USERNAME_PENDING'

export const SET_CURRENT_PAGE_MEDIA_IDS = 'SET_CURRENT_PAGE_MEDIA_IDS'
export const GET_MEDIA_IDS = 'GET_MEDIA_IDS'

export const GET_CURRENT_PAGE = 'GET_NEXT_PAGE'
export const GET_NEXT_PAGE = 'GET_NEXT_PAGE'
export const GET_USER_BY_ID = 'GET_USER_BY_ID'




