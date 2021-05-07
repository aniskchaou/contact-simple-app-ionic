import { IonButton, IonContent, IonHeader, IonLoading, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { logOutUser } from '../firebaseConfig';


const Dashboard: React.FC = () => {

  const username = useSelector((state: any) => state.user.email.split('@')[0])
  const history = useHistory()
  const [loading, setLoading] = useState<boolean>(false)


  async function logout() {
    setLoading(true)
    await logOutUser()
    setLoading(false)
    history.replace('/login')
  }

  function updateEmail() {
    history.replace('/update')
  }

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonTitle>DashBoard</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" fullscreen>
        {loading && <IonLoading message="Please wait ..." duration={0} isOpen={loading} />}
        Welcome {username} !
        <br /><br />
        <IonButton onClick={updateEmail}>Update</IonButton>
        <IonButton onClick={logout}>Log Out</IonButton>
      </IonContent>

    </IonPage >
  );
};

export default Dashboard;
