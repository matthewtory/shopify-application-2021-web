import { OMDbMovie } from './omdbRepository';
import { Observable } from 'rxjs';

import { firebaseApp } from '../index';

interface FirebaseRepository {
    submitNominations: (nominations: OMDbMovie[]) => Promise<string>,
    getSubmission: (submissionId: string) => Observable<OMDbMovie[]>,
    getResults: () => Observable<MovieNominationResult[]>
}

export type MovieNominationResult = OMDbMovie & {
    nominations: number
}

const firebaseRepository: FirebaseRepository = {
    submitNominations: async (nominations) => {
        const response = await firebaseApp.functions().httpsCallable('submitNominations')({ nominations });

        return response.data as string;
    },
    getSubmission: (submissionId) => new Observable<OMDbMovie[]>(subscriber => {
        const unsubscribe = firebaseApp.firestore()
            .collection('submissions')
            .doc(submissionId)
            .collection('nominations')
            .onSnapshot((snapshot) => {
                    subscriber.next(snapshot.docs.map(d => d.data() as OMDbMovie));
                },
                (error) => {
                    subscriber.error(error);
                    subscriber.complete();
                });

        return () => unsubscribe;
    }),
    getResults: () => new Observable<MovieNominationResult[]>(subscriber => {
        const unsubscribe = firebaseApp.firestore()
            .collection('nominations')
            .orderBy('nominations', 'desc')
            .limit(10)
            .onSnapshot((snapshot) => {
                    subscriber.next(snapshot.docs.map(d => d.data() as MovieNominationResult));
                },
                (error) => {
                    console.log(error);
                    subscriber.error(error);
                    subscriber.complete();
                });

        return () => unsubscribe;
    })
};

export default firebaseRepository;