import { IonButton, IonContent, IonHeader, IonInput, IonLoading, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { registerUser } from '../firebaseConfig';
import { toast } from '../toast';


const Register: React.FC = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const history = useHistory()

  async function register() {

    setLoading(true)
    if (email.trim() === '' || password.trim() === '')
      return toast('Username and password are required !')

    const res = await registerUser(email, password)
    if (res) {
      toast('You have registred successfully!')
    }
    setLoading(false)

    history.replace('/login')
  }

  function returnToLogin() {
    history.replace('/login')
  }

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>

      {loading && <IonLoading message="Please wait ..." duration={0} isOpen={loading} />}

      <IonContent className="ion-padding" fullscreen>

        <IonInput placeholder="Username" onIonChange={(e: any) => setUsername(e.target.value)} />
        <IonInput placeholder="Password" onIonChange={(e: any) => setPassword(e.target.value)} type="password" />
        <IonInput placeholder="Phone" onIonChange={(e: any) => setPhone(e.target.value)} />
        <IonInput placeholder="Address" onIonChange={(e: any) => setAddress(e.target.value)} />
        <IonInput placeholder="Email" onIonChange={(e: any) => setEmail(e.target.value)} />

        <IonButton onClick={register}>Register</IonButton>
        <IonButton onClick={returnToLogin}>Login</IonButton>

      </IonContent>

    </IonPage>
  );
};

export default Register;
