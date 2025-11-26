import InputField from '@/common/components/misc/InputField'
import { useState } from 'react'
type OrderFormTypes = {
    userName: string;
    email: string;
    phoneNumber: string;
    secondaryPhoneNumber: string;
    city: string;
    postCode: string;
    state: string;
    address: string;
    deliveryNotes: string;
}
const Checkout = () => {
    const [formData, setFormData] = useState<OrderFormTypes>({
        userName: "",
        email: "",
        phoneNumber: "",
        secondaryPhoneNumber: "",
        city: "",
        postCode: "",
        state: "",
        address: "",
        deliveryNotes: "",
    })
    return (
        <form className='flex'>
            <div className="contact-info">
                <span>Contact Information</span>
                <div className="grid grid-cols-2 gap-4">
                    <InputField
                        id='order-username'
                        type='text'
                        value={formData.userName}
                        setValue={e => setFormData(prev => ({ ...prev, userName: e }))}
                        placeholder='Full Name'
                    />
                    <InputField
                        id='order-email'
                        type='text'
                        value={formData.email}
                        setValue={e => setFormData(prev => ({ ...prev, email: e }))}
                        placeholder='Email'
                    />
                    <InputField
                        id='order-phoneNumber'
                        type='text'
                        value={formData.phoneNumber}
                        setValue={e => setFormData(prev => ({ ...prev, phoneNumber: e }))}
                        placeholder='Phone Number'
                    />
                    <InputField
                        id='order-secondaryPhoneNumber'
                        type='text'
                        value={formData.secondaryPhoneNumber}
                        setValue={e => setFormData(prev => ({ ...prev, secondaryPhoneNumber: e }))}
                        placeholder='Secondary Phone Number (optional)'
                    />
                </div>
                <span>Shipping Details</span>
                <div>
                    <div className="flex gap-4">
                        <InputField
                            id='order-city'
                            type='text'
                            value={formData.city}
                            setValue={e => setFormData(prev => ({ ...prev, city: e }))}
                            placeholder='City'
                        />
                        <InputField
                            id='order-postCode'
                            type='text'
                            value={formData.postCode}
                            setValue={e => setFormData(prev => ({ ...prev, postCode: e }))}
                            placeholder='Post Code'
                        />
                        <InputField
                            id='order-state'
                            type='text'
                            value={formData.state}
                            setValue={e => setFormData(prev => ({ ...prev, state: e }))}
                            placeholder='State / Government'
                        />
                    </div>
                    <InputField
                        id='order-address'
                        type='text'
                        value={formData.address}
                        setValue={e => setFormData(prev => ({ ...prev, address: e }))}
                        placeholder='Full Address'
                    />
                    <InputField
                        id='order-deliveryNotes'
                        type='text'
                        value={formData.deliveryNotes}
                        setValue={e => setFormData(prev => ({ ...prev, deliveryNotes: e }))}
                        placeholder='Additional Details / Delivery Notes'
                    />
                </div>
            </div>
            <div className="order-details">

            </div>
        </form>
    )
}

export default Checkout