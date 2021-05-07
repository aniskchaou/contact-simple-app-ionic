import { IonButton, IonContent, IonHeader, IonInput, IonLoading, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { updateEmailUser } from '../firebaseConfig';
import { setUserState } from '../redux/actions';



const UpdateProfile: React.FC = () => {

  var email_state = useSelector((state: any) => state.user.email)
  var user = { email: email_state }
  const history = useHistory()
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useDispatch()


  async function update() {
    setLoading(true)
    await updateEmailUser(user.email)
    dispatch(setUserState(user.email))
    setLoading(false)
    history.replace('/dashboard')
  }

  function setEmail(value: string) {
    user.email = value
  }

  function returnToDashboard() {
    history.replace('/dashboard')
  }

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonTitle>Update Email</IonTitle>
        </IonToolbar>
      </IonHeader>
      {loading && <IonLoading message="Please wait ..." duration={0} isOpen={loading} />}
      <IonContent className="ion-padding" fullscreen>
        <IonInput placeholder="Email?" value={user.email} onIonChange={(e: any) => setEmail(e.target.value)} />
        <br /><br />
        <IonButton onClick={update}>Update Email</IonButton>
        <IonButton onClick={returnToDashboard}>Return</IonButton>

      </IonContent>

    </IonPage>
  );
};

export default UpdateProfile;
