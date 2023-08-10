import React from "react";

import meet from '../../images/meet.svg';
import zoom from '../../images/zoom.svg';

import style from './card.module.scss';
import { __, sprintf } from "../../utilities/helpers.jsx";

const icons = {
	meet, zoom
}

export function ScheduleCard(props) {
	const {type, link, schedule_title, date, time_frame, agenda, guests=[], note} = props;
	
	const flex_class = "d-flex margin-bottom-15".classNames();
	const icon_class = 'font-size-24'.classNames();
	const legend_class = 'd-block font-size-17 font-weight-600 text-color-primary margin-bottom-4'.classNames();
	const sub_text_class = 'd-block font-size-15 font-weight-400 text-color-secondary'.classNames();
	const flex_1 = 'flex-1'.classNames();
	const width = 'width-39'.classNames();

	return <div className={'schedule'.classNames(style) + 'border-radius-6'.classNames()}>
		<div className={'header'.classNames(style)}>
			<div className={'d-flex'.classNames()}>
				<div className={'flex-1'.classNames()}>
					<img src={icons[type]} className={'d-inline-block width-30 margin-bottom-9'.classNames()}/>
				</div>
				<div>
					<i className={'ch-icon ch-icon-more-1 font-size-20 text-color-secondary'.classNames()}></i>
				</div>
			</div>
			<strong className={'d-block font-size-20 font-weight-600 foreground-color-primary'.classNames()}>
				{schedule_title}
			</strong>
		</div>
		<div className={'details'.classNames(style)}>
			<div className={flex_class}>
				<div className={width}>
					<i className={'ch-icon ch-icon-clock-1'.classNames() + icon_class}></i>
				</div>
				<div className={flex_1}>
					<strong className={legend_class}>{date}</strong>
					<span className={sub_text_class}>{time_frame}</span>
				</div>
			</div>
			
			<div className={flex_class}>
				<div className={width}>
					<i className={'ch-icon ch-icon-flag'.classNames() + icon_class}></i>
				</div>
				<div className={flex_1}>
					<strong className={legend_class}>{__( 'Agenda' )}</strong>
					<span className={sub_text_class}>{agenda}</span>
				</div>
			</div>

			<div className={flex_class}>
				<div className={width}>
					<i className={'ch-icon ch-icon-profile-2user'.classNames() + icon_class}></i>
				</div>
				<div className={flex_1}>
					<strong className={legend_class}>
						{guests.length > 1 ? sprintf( __( '%s Guests' ), guests.length ) : __( '1 Guest' )}
					</strong>
					{guests.map(guest=>{
						let {name, email} = guest;
						return <span className={sub_text_class + 'margin-bottom-4'.classNames()}>
							{name} ({email})
						</span>
					})}
				</div>
			</div>

			<div className={flex_class}>
				<div className={width}>
					<i className={'ch-icon ch-icon-textalign-left'.classNames() + icon_class}></i>
				</div>
				<div className={flex_1}>
					<strong className={legend_class}>
						{__( 'Note' )}
					</strong>
					<span className={sub_text_class + 'margin-bottom-4'.classNames()}>
						{note}
					</span>
				</div>
			</div>

			<a href={link} target="_blank" className={"button button-primary button-full-width".classNames()}>
				{__( 'Join Meeting' )}
			</a>
		</div>
	</div>
}
