import loading from '@/assets/icons/Loading.svg'
// thanks for Nikhil Krishnan for making this spinner <3
// codepen : https://codepen.io/nikhil8krishnan/pen/rVoXJa
const Spinner = () => {
    return (
        <div className='grid place-items-center p-2'>
            <img src={loading} className="w-30" alt="loading spinner" />
        </div>
    )
}

export default Spinner