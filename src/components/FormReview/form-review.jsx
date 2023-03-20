import { useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../utils/api";
import { EMAIL_REGEXP, PASSWORD_REGEXP, VALIDATE_CONFIG } from "../../utils/contants";
import Form from "../Form/form";
import { FormButton } from "../FormButton/form-button";
import { FormInput } from "../FormInput/form-input";
import { Rating } from "../Rating/rating";

export const FormReview = ({title = 'Отзыв о товаре', productId, setProduct}) => {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" })
    const [rating, setRating] = useState(1)

    const sendReviewProduct = (data) => {
        api.createReviewProduct(productId, {...data, rating})
            .then(newProduct => {
                setProduct && setProduct(newProduct)
            })
    }
 
    const textReview = register('text', {
        required: {
            value: true,
            message: VALIDATE_CONFIG.requiredMessage
        }
    })

    return (
        <Form title={title} handleFormSubmit={handleSubmit(sendReviewProduct)}>
            
            <Rating rating={rating} isEditable setRating={setRating} />

            <FormInput
                {...textReview}
                id="text"
                typeinput="textarea"
                placeholder="Напишите текст отзывы"
            />
            {errors?.email && <p className='errorMessage'>{errors?.email?.message}</p>}

            <FormButton type="submit" color="yellow">Отправить отзыв</FormButton>
        </Form>
    )
}