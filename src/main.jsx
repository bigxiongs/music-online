import ReactDOM from 'react-dom/client'
import Layout from '@/components/Layout'
import { App } from 'antd';
import { BrowserRouter } from "react-router-dom";
import 'normalize.css'
import '@/assets/fonts/fonts.css';


ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App>     
            <Layout />
        </App>
    </BrowserRouter>
)
