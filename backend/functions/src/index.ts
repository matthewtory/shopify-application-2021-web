import * as functions from "firebase-functions";
import admin, {firestore} from 'firebase-admin';

admin.initializeApp();

type MovieNominationSubmission = {
    imdbID: string,
    Title: string,
    Year: string,
    Poster: string
}

export const submitNominations = functions.https.onCall(async (data, context) => {
    const uid = context.auth?.uid;

    if (!uid) {
        throw new Error('You must be signed in to submit nominations');
    }

    const movieSubmissions = data['nominations'] as MovieNominationSubmission[];

    const submissionContainerRef = firestore().collection('submissions').doc();
    const submissionContainerData = {
        uid
    }

    const promises: Promise<any>[] = [
        submissionContainerRef.set(submissionContainerData),
        ...movieSubmissions.map(movie => {
            const nominationRef = firestore().collection('nominations').doc(movie.imdbID)
            const submissionRef = submissionContainerRef.collection('nominations').doc(movie.imdbID);

            return Promise.all([
                nominationRef.set({
                    ...movie,
                    nominations: firestore.FieldValue.increment(1)
                }, { merge: true }),
                submissionRef.set(movie)
            ])
        }),

    ]

    await Promise.all(promises)

    return submissionContainerRef.id
})