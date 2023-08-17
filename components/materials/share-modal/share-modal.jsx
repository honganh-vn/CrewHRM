import React, { useContext } from "react";
import { ContextModal, Modal } from "../modal/modal.jsx";
import { __, copyToClipboard } from "../../utilities/helpers.jsx";

import facebook from '../../images/brands/facebook.svg';
import linkedin from '../../images/brands/linkedin.svg';
import twitter from '../../images/brands/twitter.svg';
import reddit from '../../images/brands/reddit.svg';
import email from '../../images/brands/email.svg';
import { ContextToast } from "../toast/toast.jsx";

const targets = [
	{
		label : __( 'Facebook' ),
		icon  : facebook
	},
	{
		label : __( 'Linkedin' ),
		icon  : linkedin
	},
	{
		label : __( 'Twitter' ),
		icon  : twitter
	},
	{
		label : __( 'Reddit' ),
		icon  : reddit
	},
	{
		label : __( 'Email' ),
		icon  : email
	},
];

function ShareModalHandler(props) {
	const {url} = props;
	const {close} = useContext(ContextModal);
	const {addToast} = useContext(ContextToast);

	return <div className={'background-color-white border-radius-10 padding-30'.classNames()} style={{width: '586px', maxWidth: '100%'}}>
		<div className={'d-flex align-items-center'.classNames()}>
			<div className={'flex-1'.classNames()}>
				<span className={'font-size-20 font-weight-500 text-color-primary'.classNames()}>
					{__( 'Share' )}
				</span>
			</div>
			<div>
				<i className={'ch-icon ch-icon-times font-size-18 text-color-tertiary cursor-pointer'.classNames()} onClick={()=>close()}></i>
			</div>
		</div>
		<div className={'d-flex align-items-center justify-content-space-between padding-vertical-40'.classNames()}>
			{targets.map((target, index)=>{
				return <div key={index} className={'text-align-center'.classNames()}>
					<img src={target.icon} className={'width-44'.classNames()}/>
					<span className={'d-block margin-top-12 font-size-16 font-weight-400 text-color-secondary'.classNames()}>
						{target.label}
					</span>
				</div>
			})}
		</div>
		<div className={'d-flex align-items-center border-1-5 border-color-tertiary padding-20 background-color-tertiary border-radius-10'.classNames()} style={{backgroundColor: '#F9F9F9'}}>
			<span className={'flex-1 font-size-16 font-weight-400 letter-spacing--3 text-color-primary'.classNames()}>
				{url}
			</span>
			<span className={'cursor-pointer'.classNames()} onClick={()=>copyToClipboard(url, addToast)}>
				<i className={'ch-icon ch-icon-document-copy1 font-size-24 text-color-secondary margin-right-8 vertical-align-middle'.classNames()}></i>
				<span className={'font-size-16 font-weight-400 letter-spacing--3 text-color-secondary vertical-align-middle'.classNames()}>
					{__( 'Copy' )}
				</span>
			</span>
		</div>
	</div>
}

export function ShareModal(props) {
	return <Modal onClose={props.onClose}>
		<ShareModalHandler {...props}/>
	</Modal>
}