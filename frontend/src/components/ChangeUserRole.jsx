import { useState } from "react";
import { ROLE } from "../common/role";
import { IoMdClose } from "react-icons/io";
import { SummaryApi } from "../common";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
function ChangeUserRole({ userId, name, email, role, onclose, getUsers }) {
	const [userRole, setUserRole] = useState(role);

	const handleOnChangeSelect = e => {
		setUserRole(e.target.value);
	};

	const updateUserRole = async () => {
		const dataResponse = await fetch(SummaryApi.updateUser.url, {
			method: SummaryApi.updateUser.method,
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userId,
				role: userRole,
			}),
		});

		const dataApi = await dataResponse.json();
		if (dataApi.success) {
			toast.success(dataApi.message);
			onclose();
			getUsers()
		}
	};

	return (
		<div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50'>
			<div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>
				<button className='block ml-auto' onClick={onclose}>
					<IoMdClose />
				</button>

				<h1 className='pb-4 text-lg font-medium'>Change User Role</h1>
				<p>Name: {name}</p>
				<p>Email: {email}</p>
				<div className='flex justify-between items-center my-4'>
					<p>Role:</p>
					<select className='border px-4 py-1' value={userRole} onChange={handleOnChangeSelect}>
						{Object.values(ROLE).map(role => (
							<option key={role} value={role}>
								{role}
							</option>
						))}
					</select>
				</div>
				<button
					className='w-fit mx-auto block border py-2 px-3 rounded-full bg-red-600 text-white hover:bg-red-700'
					onClick={updateUserRole}
				>
					Change Role
				</button>
			</div>
		</div>
	);
}

export default ChangeUserRole;
