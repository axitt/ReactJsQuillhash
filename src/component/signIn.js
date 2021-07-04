import { render } from '@testing-library/react';
import React, {useState, useEffect} from 'react';
import '../App.css';
import Navbar from './navbar';
import { Form, Layout, Input, Button, Typography, Divider, Alert } from 'antd';
import {Redirect} from "react-router-dom";
import { BaseUrl } from '../redux/BaseUrl';
const {Content} = Layout;
const { Text, Link } = Typography;

function SignIn(props){

    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
  
    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
  

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState(false);



      const submit = (event) => {
        console.log('calling 1');
        console.log(event);

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email:email,
            password:password
        })
      };
      fetch(BaseUrl+'users/login', requestOptions)
      .then(async response => {
          const isJson = response.headers.get('content-type')?.includes('application/json');
          const data = isJson && await response.json();


          if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            setError(true);
            return Promise.reject(error);
        }
        console.log(data);

        window.localStorage.setItem('token', data.token);
        setRedirect(true);

      })
      .catch(error => {
        setError(true);
          console.error('There was an error!', error);
      });
     }

    if (redirect) {
        return <Redirect to="/"/>;
    }

    return (
      <>
      {(props.access_token==null)?
        <Layout className="layout">
             <Content style={{ padding: '50px 50px' }}>
             <div className="site-layout-content sign-form">
                 <Divider orientation="center">
                  <h3 style={{color:'#008080'}}>Log In</h3>
                 </Divider><br/>
              <Form
              {...layout}
                 name="basic"
                 initialValues={{
                 remember: true,
                }}
                onFinish={submit}
                onFinishFailed={onFinishFailed}
              >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                    { 
                        required: true,
                        type: 'email',
                 },
                ]}
              >
              <Input onChange={e => setEmail(e.target.value)} />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password  onChange={e => setPassword(e.target.value)} />
                </Form.Item>
      <div style={{textAlign:'center'}}>
        <Button htmlType="submit" style={{color:'#fff',backgroundColor:'#008080'}} className="submitbtn-1">Login</Button>
      </div>
    </Form>
    <div style={{textAlign:'center'}}>
      <br/><br/>
        {error?<Alert message="User Not Found!" type="error" />:<></>}   
        <a href="/signup"><Text type="secondary">Don't have an Account. Register</Text></a><br/>
    </div><br/>
    </div>
    </Content>
    </Layout>
    :<Redirect to="/"/>}
    </>
    );
    };

export default SignIn;