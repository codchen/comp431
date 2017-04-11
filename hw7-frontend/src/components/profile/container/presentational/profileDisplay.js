import React from 'react'

// The presentational component for displaying current profile
const ProfileDisplay = ({ profile }) => (
	<div className='ui segments'>
		<div className='ui segment'>
			<h3 className>Current Info</h3>
		</div>
		<div className='ui horizontal segments'>
			<div className='ui segment'><b>Display Name</b></div>
			<div className='ui segment'>{ profile.username }</div>
		</div>
		<div className='ui horizontal segments'>
			<div className='ui segment'><b>Email</b></div>
			<div className='ui segment' id='email'>{ profile.email }</div>
		</div>
		<div className='ui horizontal segments'>
			<div className='ui segment'><b>Birthday</b></div>
			<div className='ui segment'>{ profile.birthday.toJSON() }</div>
		</div>
		<div className='ui horizontal segments'>
			<div className='ui segment'><b>Zipcode</b></div>
			<div className='ui segment' id='zipcode'>{ profile.zip }</div>
		</div>
		<div className='ui horizontal segments'>
			<div className='ui segment'><b>Password</b></div>
			<div className='ui segment' id='password'>{
				'Hidden: will not change on update' }</div>
		</div>
	</div>
)

ProfileDisplay.propTypes = {
	profile: React.PropTypes.object.isRequired
}

export default ProfileDisplay