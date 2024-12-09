import { GetProp, message, Upload, UploadProps } from "antd";
import {
    FieldValues,
    useController,
    UseControllerProps,
} from "react-hook-form";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
};

type PropsType<T extends FieldValues> = UseControllerProps<T>;

const UploadCustom = <T extends FieldValues>(props: PropsType<T>) => {
    const { control, name } = props;

    const {
        field: { onChange, value },
        fieldState: { error },
    } = useController({
        control,
        name,
    });

    const handleChange: UploadProps["onChange"] = (info) => {
        getBase64(info.file.originFileObj as FileType, (url: string) => {
            onChange(url);
        });
    };

    const uploadButton = (
        <button style={{ border: 0, background: "none" }} type="button">
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );
    return (
        <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
        >
            {value ? (
                <img src={value} alt="avatar" style={{ width: "100%" }} />
            ) : (
                uploadButton
            )}
        </Upload>
    );
};

export default UploadCustom;
