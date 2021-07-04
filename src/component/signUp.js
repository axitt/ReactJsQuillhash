import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import '../App.css';
import { Form, Layout, InputNumber, Input, Button, Typography, Divider, Alert, Upload, Space} from 'antd';
import {BaseUrl} from '../redux/BaseUrl';
import axios from 'axios';
import { render } from 'react-dom';
const {Content} = Layout;
const { Text, Link } = Typography;


const SignUp = ({history},props) => {

        const validateMessages = {
            required: '${label} is required!',
            types: {
              email: '${label} is not a valid email!',
              number: '${label} is not a valid number!',
            },
          };

      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

      const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
      };

      const [formData, setFormData] = useState({
        email:"",
        password:""
      });
      const [error, setError] = useState(false);
      const [redirect, setRedirect] = useState(false);
      const [imgCollection, setImgCollection] = useState([]);

      const { email, password} = formData;

      const submit = async (e) => {
        console.log('calling 1');
        console.log(e);
              const data = new FormData()

          
          for(var x = 0; x<imgCollection.length; x++) {
              data.append('image', imgCollection[x]['file'])
          }


        const newUser = {
            email:e.email,
            password:e.password,
            imgCollection:data
        };

        try { 
          const config = {
            headers: {
              "Content-Type":"application/json"
            },
          };
          console.log(newUser);
          const body = newUser;
          console.log(body);
          const res = await axios.post(BaseUrl+'users', body, config);
          window.localStorage.setItem('token', res.data.token);
          setRedirect(true);
          } catch(err){
          console.log(err.response.data);
          setError(true);
        }
    };
       if (redirect) {
        return <Redirect to="/"/>;
    }

    return (
      <>
      {(props.token==null)?
        <Layout className="layout">
             <Content style={{ padding: '50px 50px' }}>
             <div className="site-layout-content sign-form">
                 <Divider orientation="center">
                  <h3 style={{color:'#008080'}}>Sign Up</h3>
                 </Divider>
                 <br/>
              <Form
                 name="basic"
                 initialValues={{
                 remember: true,
                }}
                onFinish={submit}
                onFinishFailed={onFinishFailed}
                validateMessages={validateMessages}
                {...layout}
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
              <Input onchange={e => setFormData({ ...formData, email : e.target.value })}/>
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
                hasFeedback
              >
                <Input.Password onchange={e => setFormData({ ...formData, password : e.target.value })}/>
              </Form.Item>
              <Form.Item
              label="Upload Photos"
              name="imgCollection">
              <Input type="file" listType="picture" maxCount={3} multiple accept="image/*" onchange={e =>setImgCollection(...e.target.files) }/>
              </Form.Item>

      <div style={{textAlign:'center'}}>
        <Button htmlType="submit" style={{color:'#fff',backgroundColor:'#008080'}} className="submitbtn-1">Sign Up</Button>
      </div>
    </Form><br/>
    <div style={{textAlign:'center'}}>
        {error?<Alert message="Cannot create, Contact Us!" type="error" />:<></>}   
        <a href="/signin"><Text type="secondary">Already have an account. Login</Text></a>
    </div><br/>
    </div>
    </Content>
    </Layout>
    :<Redirect to="/signin"/>}
    </>
    );
};

export default SignUp;