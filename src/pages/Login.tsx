import { IonButton, IonContent, IonHeader, IonInput, IonLoading, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginUser } from '../firebaseConfig';
import { setUserState } from '../redux/actions';
import { toast } from '../toast';


const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useDispatch()
  const history = useHistory()

  async function login() {

    if (email.trim() === '' || password.trim() === '')
      return toast('Username and password are required !')


    setLoading(true)
    const res: any = await loginUser(email, password)
    if (res) {
      toast('You have logged in !')
      dispatch(setUserState(res.user.email))
      history.replace('/dashboard')
    }

    setLoading(false)
  }


  function returnToRegister() {
    history.replace('/register')
  }


  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonTitle>Simple Contact App  </IonTitle>
        </IonToolbar>
      </IonHeader>
      {loading && <IonLoading message="Please wait ..." duration={0} isOpen={loading} />}
      <IonContent className="ion-padding" fullscreen>
        <IonInput placeholder="email" onIonChange={(e: any) => setEmail(e.target.value)} />
        <IonInput type="password" placeholder="Password" onIonChange={(e: any) => setPassword(e.target.value)} />
        <br /><br />
        <IonButton onClick={login}>Login</IonButton>
        <IonButton onClick={returnToRegister}>Register</IonButton>

      </IonContent>

    </IonPage>
  );
};

export default Login;
