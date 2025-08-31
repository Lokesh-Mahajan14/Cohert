import CommonInput from "../component-input";

const formTypes = {
    INPUT: 'input',
    SELECT: 'select',
    TEXTAREA: 'textarea',
};

function CommonForm({ formControls = [], formData, setFormData, buttonText, onHandleSubmit }) {
    function renderFormElement(getCurrentElement) {
        let content = null;
        switch (getCurrentElement?.compoentType) {
            case formTypes.INPUT:
            default:
                content = (
                    <CommonInput
                        label={getCurrentElement.label}
                        name={getCurrentElement.name}
                        id={getCurrentElement.id}
                        placeholder={getCurrentElement.placeholder}
                        value={formData[getCurrentElement.name] || ""}  // bind state
                        type={getCurrentElement.type || "text"}         // correct type
                        onChange={(event) => {
                            setFormData({
                                ...formData,
                                [event.target.name]: event.target.value,
                            });
                        }}
                    />
                );
                break;
        }
        return content;
    }

    return (
        <form onSubmit={onHandleSubmit}>
            {formControls?.length
                ? formControls.map((singleformelement) => (
                    <div key={singleformelement.id || singleformelement.name}>
                        {renderFormElement(singleformelement)}
                    </div>
                ))
                : null}
            <div style={{ marginTop: "12px" }}>
                <button type="submit">{buttonText || "Submit"}</button>
            </div>
        </form>
    );
}
export default CommonForm;
