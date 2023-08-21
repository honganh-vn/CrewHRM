import React, { useState } from "react";
import { Modal } from "../../../../../materials/modal/modal.jsx";
import { __, getRandomString } from "../../../../../utilities/helpers.jsx";

export function AddDepartmentModal({addDepartMent}) {
	const [state, setState] = useState({
		department_name: null
	});

	return <Modal>
		<span className={'d-block font-size-24 font-weight-600 text-color-primary margin-bottom-20'.classNames()}>
			{__( 'Add Department' )}
		</span>
		
		<div className={'padding-vertical-15'.classNames()}>
			<span className={'d-block font-size-15 font-weight-500 text-color-primary margin-bottom-10'.classNames()}>
				{__( 'Department Name' )}
			</span>

			<input 
				type="text" 
				className={"w-full padding-15 border-1-5 border-color-tertiary border-focus-color-primary border-radius-10 height-48 font-size-15 font-weight-400 line-height-25 text-color-primary".classNames()}
				onChange={e=>setState({...state, department_name: e.currentTarget.value})}/>
		</div>

		<div className={'d-flex align-items-center justify-content-end column-gap-21'.classNames()}>
			<span className={'font-size-15 font-weight-500 letter-spacing--3 text-color-light cursor-pointer'.classNames()} onClick={()=>addDepartMent(null)}>
				{__( 'Cancel' )}
			</span>
			<button className={'button button-primary'.classNames()} onClick={()=>addDepartMent({id: getRandomString(), label: state.department_name})} disabled={!state.department_name}>
				{__( 'Add Department' )}
			</button>
		</div>
	</Modal>
}
