import React, { useRef } from "react";

import { useTranslation } from 'react-i18next';
import * as Components from '../styles/StyledForm';
import ApiClient from "../api/ApiRoutes";

export default function ForgotPassword() {

    const email = useRef();
    const { t } = useTranslation();

    const handleClick = async (e) => {
        e.preventDefault();

        ApiClient.ForgotPassword(email.current.value)
            .then((res) => {
                alert('Email sent')
                window.location.reload(false);
            })
            .catch(error => {
                if (error.response.status === 404) return alert('Email doesn\'t exist')
            });
    }

    return (
        <Components.SignInContainer signinIn={true}>
            <Components.Form onSubmit={handleClick}>
                <Components.Title>Forgot Password</Components.Title>
                <Components.Input type='email' placeholder={t('Email')}
                    required
                    ref={email}
                />
                <Components.Button type="submit">Reset</Components.Button>
                <br></br>
            </Components.Form>

        </Components.SignInContainer>
    )
}
