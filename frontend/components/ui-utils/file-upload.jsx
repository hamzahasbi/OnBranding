import { Input, FormControl, FormLabel, InputGroup, InputLeftElement, FormErrorMessage, Icon } from "@chakra-ui/react";
import { FiFile } from "react-icons/fi";
import { useController } from "react-hook-form";
import { useRef } from "react";

const FileUpload = ({ name, placeholder, acceptedFileTypes, control, children, isRequired=false }) => {
  const inputRef = useRef();
  const {
    field: { ref, value, ...inputProps },
    meta: { invalid },
  } = useController({
    name,
    control,
    rules: { required: isRequired },
  });

  return (
    <FormControl isInvalid={invalid} isRequired>
      <FormLabel htmlFor="writeUpFile">{children}</FormLabel>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<Icon as={FiFile} />}
        />
        
        <input type='file' accept={acceptedFileTypes} name={name} ref={inputRef} {...inputProps} inputRef={ref} style={{ display: 'none' }}></input>
        <div class="py-20 h-screen bg-white px-2">
            <div class="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
                <div class="md:flex">
                    <div class="w-full p-3">
                        <div class="relative border-dotted h-48 rounded-lg border-dashed border-2 border-blue-700 bg-gray-100 flex justify-center items-center">
                            <div class="absolute">
                                <div class="flex flex-col items-center"> <i class="fa fa-folder-open fa-4x text-blue-700"></i> <span class="block text-gray-400 font-normal">Attach you files here</span> </div>
                            </div>
                            <Input
                              placeholder={placeholder || "Your file ..."}
                              onClick={() => inputRef.current.click()}
                              value={value}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

      </InputGroup>
      <FormErrorMessage>
        {invalid}
      </FormErrorMessage>
    </FormControl>
  );
}

export default FileUpload;