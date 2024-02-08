import { Injectable } from '@angular/core';
import { DocumentData, DocumentReference, Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, forkJoin, from, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BTHAService {

  constructor(private firestore: Firestore, private router: Router) { }

  getSectionCount() {
    let sections = collection(this.firestore, 'sections');
    return collectionData(sections, { idField: 'id' }).pipe(map(sections => sections.length));
  }

  getMatiereCount(): Observable<number> {
    return from(getDocs(query(collection(this.firestore, 'sections')))).pipe(
      switchMap(sectionsSnapshot => {
        const matiereObservables = sectionsSnapshot.docs.map(section => {
          const matieresQuery = query(collection(this.firestore, `sections/${section.id}/matieres`));
          return from(getDocs(matieresQuery)).pipe(
            map(matieresSnapshot => matieresSnapshot.size)
          );
        });

        return forkJoin(matiereObservables);
      }),
      map(matieresCounts => matieresCounts.reduce((acc, count) => acc + count, 0))
    );
  }

  getEpreuveCount(): Observable<number> {
    return from(getDocs(query(collection(this.firestore, 'sections')))).pipe(
      switchMap(sectionsSnapshot => {
        const sectionObservables = sectionsSnapshot.docs.map(section => {
          const matieresQuery = query(collection(this.firestore, `sections/${section.id}/matieres`));
          return from(getDocs(matieresQuery)).pipe(
            switchMap(matieresSnapshot => {
              const epreuveObservables = matieresSnapshot.docs.map(matiere => {
                const epreuvesQuery = query(collection(this.firestore, `sections/${section.id}/matieres/${matiere.id}/epreuves`));
                return from(getDocs(epreuvesQuery)).pipe(
                  map(epreuvesSnapshot => epreuvesSnapshot.size)
                );
              });

              return forkJoin(epreuveObservables);
            })
          );
        });

        return forkJoin(sectionObservables).pipe(
          map(epreuveCountsArray => epreuveCountsArray.flat().reduce((acc, count) => acc + count, 0))
        );
      })
    );
  }

  getSections() {
    let sections = collection(this.firestore, 'sections');
    return collectionData(sections, { idField: 'id' });
  }

  getMatieres(): Observable<any[]> {
    return from(getDocs(query(collection(this.firestore, 'sections')))).pipe(
      switchMap(sectionsSnapshot => {
        const matiereObservables = sectionsSnapshot.docs.map(section => {
          const matieresQuery = query(collection(this.firestore, `sections/${section.id}/matieres`));
          return from(getDocs(matieresQuery)).pipe(
            map(matieresSnapshot => {
              const matieres = matieresSnapshot.docs.map(doc => ({
                id: doc.id,
                section: { id: section.id, ...section.data() }, // Include section information
                ...doc.data()
              }));
              return matieres;
            })
          );
        });

        return forkJoin(matiereObservables);
      }),
      map(matieresList => matieresList.reduce((acc, matieres) => acc.concat(matieres), []))
    );
  }

  getEpreuves(): Observable<any[]> {
    const sectionsRef = collection(this.firestore, 'sections');

    return from(getDocs(sectionsRef)).pipe(
      switchMap(sectionsSnapshot => {
        const epreuveObservables: Observable<any>[] = [];

        sectionsSnapshot.forEach(sectionDoc => {
          const matieresRef = collection(this.firestore, `sections/${sectionDoc.id}/matieres`);

          epreuveObservables.push(
            from(getDocs(matieresRef)).pipe(
              switchMap(matieresSnapshot => {
                const matiereObservables: Observable<any>[] = [];

                matieresSnapshot.forEach(matiereDoc => {
                  const epreuvesRef = collection(this.firestore, `sections/${sectionDoc.id}/matieres/${matiereDoc.id}/epreuves`);

                  matiereObservables.push(
                    from(getDocs(epreuvesRef)).pipe(
                      map(epreuvesSnapshot => {
                        const epreuves = epreuvesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                        // Add associated matiere and section info to each epreuve
                        return epreuves.map(epreuve => ({
                          ...epreuve,
                          matiere: { id: matiereDoc.id, ...matiereDoc.data() },
                          section: { id: sectionDoc.id, ...sectionDoc.data() }
                        }));
                      })
                    )
                  );
                });

                return forkJoin(matiereObservables).pipe(
                  map(matiereEpreuvesList => matiereEpreuvesList.reduce((acc, epreuves) => acc.concat(epreuves), []))
                );
              })
            )
          );
        });

        return forkJoin(epreuveObservables).pipe(
          map(epreuvesList => {
            return epreuvesList.reduce((acc, epreuves) => acc.concat(epreuves), []);
          })
        );
      })
    );
  }

  getMatieresBySectionId(sectionId: string) {
    const matieresCollection = collection(this.firestore, `sections/${sectionId}/matieres`);
    return from(getDocs(matieresCollection)).pipe(
      map((querySnapshot) => querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );
  }

  addSection(nom: string, icon: string): Observable<[void, DocumentReference<DocumentData, DocumentData>]> {
    const sectionsCollection = collection(this.firestore, 'sections');
    const newSectionDocRef = doc(sectionsCollection);
    const sectionData = { nom, icon };
    const addSection$ = from(setDoc(newSectionDocRef, sectionData));
    const newMatieresCollectionRef = collection(newSectionDocRef, 'matieres');
    const initialMatiereData = { nom: 'Initial Matiere', icon: 'matiere-icon' };
    const addMatiere$ = from(addDoc(newMatieresCollectionRef, initialMatiereData));
    return forkJoin([addSection$, addMatiere$]);
  }

  addMatiere(sectionId: string, nom: string): Observable<[void, DocumentReference<DocumentData, DocumentData>]> {
    const matieresCollectionRef = collection(this.firestore, `sections/${sectionId}/matieres`);
    const newMatiereDocRef = doc(matieresCollectionRef);
    const matiereData = { nom };
    const addMatiere$ = from(setDoc(newMatiereDocRef, matiereData));
    const epreuvesCollectionRef = collection(newMatiereDocRef, 'epreuves');
    const initialEpreuveData = { annee: 'Initial Epreuve' };
    const addEpreuve$ = from(addDoc(epreuvesCollectionRef, initialEpreuveData));
    return forkJoin([addMatiere$, addEpreuve$]);
  }

  addEpreuve(sectionId: string, matiereId: string, annee: string, enoncePr: string, corrigePr: string, enonceCon: string, corrigeCon: string): Observable<DocumentReference<DocumentData, DocumentData>> {
    const epreuvesCollectionRef = collection(this.firestore, `sections/${sectionId}/matieres/${matiereId}/epreuves`);
    return from(addDoc(epreuvesCollectionRef, { annee, enoncePr, corrigePr, enonceCon, corrigeCon }));
  }

  getSectionDetails(sectionId: string): Observable<any> {
    const sectionDocRef = doc(this.firestore, `sections/${sectionId}`);
    return from(getDoc(sectionDocRef)).pipe(map((doc) => ({ id: doc.id, ...doc.data() })));
  }

  updateSection(sectionId: string, updatedData: { nom?: string, icon?: string }): Observable<void> {
    const sectionDocRef = doc(this.firestore, `sections/${sectionId}`);
    return from(updateDoc(sectionDocRef, updatedData));
  }

  getMatiereDetails(sectionId: string, matiereId: string): Observable<any> {
    const matiereDocRef = doc(this.firestore, `sections/${sectionId}/matieres/${matiereId}`);
    return from(getDoc(matiereDocRef)).pipe(map((doc) => ({ id: doc.id, ...doc.data() })));
  }

  updateMatiere(sectionId: string, matiereId: string, updatedData: { nom?: string }): Observable<void> {
    const matiereDocRef = doc(this.firestore, `sections/${sectionId}/matieres/${matiereId}`);
    return from(updateDoc(matiereDocRef, updatedData));
  }

  getEpreuveDetails(sectionId: string, matiereId: string, epreuveId: string): Observable<any> {
    const epreuveDocRef = doc(this.firestore, `sections/${sectionId}/matieres/${matiereId}/epreuves/${epreuveId}`);
    return from(getDoc(epreuveDocRef)).pipe(map((doc) => ({ id: doc.id, ...doc.data() })));
  }

  updateEpreuve(sectionId: string, matiereId: string, epreuveId: string, updatedData: { annee?: string, enoncePr?: string, corrigePr?: string, enonceCon?: string, corrigeCon?: string }): Observable<void> {
    const epreuveDocRef = doc(this.firestore, `sections/${sectionId}/matieres/${matiereId}/epreuves/${epreuveId}`);
    return from(updateDoc(epreuveDocRef, updatedData));
  }

  deleteSection(sectionId: string): Observable<void> {
    const sectionDocRef = doc(this.firestore, `sections/${sectionId}`);
    return from(deleteDoc(sectionDocRef));
  }

  deleteMatiere(sectionId: string, matiereId: string): Observable<void> {
    const matiereDocRef = doc(this.firestore, `sections/${sectionId}/matieres/${matiereId}`);
    return from(deleteDoc(matiereDocRef));
  }

  deleteEpreuve(sectionId: string, matiereId: string, epreuveId: string): Observable<void> {
    const epreuveDocRef = doc(this.firestore, `sections/${sectionId}/matieres/${matiereId}/epreuves/${epreuveId}`);
    return from(deleteDoc(epreuveDocRef));
  }

  login(login: string, password: string): Observable<boolean> {
    const usersCollection = collection(this.firestore, 'users');
    const q = query(usersCollection, where('login', '==', login), where('password', '==', password));

    return from(getDocs(q)).pipe(
      map(snapshot => !snapshot.empty)
    );
  }

  isLoggedIn(): boolean {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      this.router.navigate(['/login']);
    }
    return isLoggedIn;
  }

  logout(): void {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

  getEpreuvesWithYear(): Observable<any[]> {
    return this.getEpreuves().pipe(
      map(epreuves => epreuves.map(epreuve => ({ ...epreuve, year: epreuve.annee })))
    );
  }
  
}
