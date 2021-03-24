import { 
  FormControl,
  Text,
  FormLabel, 
  FormErrorMessage, 
  IconButton 
} from "@chakra-ui/react";
import { TiUploadOutline } from "react-icons/ti";
import { MdCloudDone } from "react-icons/md";
import { useController } from "react-hook-form";
import { useRef } from "react";
import { createIcon } from "@chakra-ui/icons"


export const FileIcon = createIcon({
  displayName: "FileIcon",
  viewBox: "0 0 48 48",
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" 
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />

  ),
  
})

const FileUpload = ({ name, placeholder, acceptedFileTypes, control, children, isRequired = false }) => {
  const inputRef = useRef();

  const {
    field: {ref, value, ...inputProps },
    meta: { invalid },
  } = useController({
    name,
    defaultValue: "",
    control,
    rules: { required: isRequired },
  });


  return (
    <FormControl isInvalid={invalid} isRequired={isRequired}>
      <FormLabel htmlFor="writeUpFile" className="block text-sm font-medium text-gray-700">{children}</FormLabel>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <input type='file' 
          accept={acceptedFileTypes}
          name={name}
          ref={inputRef} 
          {...inputProps} 
          inputref={ref}
          style={{ display: 'none' }}/>
          <div className="space-y-1 text-center">
            <div className="flex text-sm text-gray-600">
                <IconButton
                  placeholder={placeholder || "Your file ..."}
                  onClick={() => inputRef.current.click()}
                  icon={value.length > 0 ?
                    <MdCloudDone className="mx-auto h-12 w-12 text-gray-400"/> :
                    <TiUploadOutline className="mx-auto h-12 w-12 text-gray-400"/>
                  }
                  ml={10}
                  mb={3}
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                />
            </div>
            <Text className="text-xs text-gray-500">
              {value.length > 0 ? value : "PNG, JPG, GIF up to 10MB"}
            </Text>
          </div>
        </div>
      <FormErrorMessage>
        {invalid}
      </FormErrorMessage>
    </FormControl>
  );
}

export default FileUpload;