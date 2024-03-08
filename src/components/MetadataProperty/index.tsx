import React from 'react'
import { CiCircleRemove } from 'react-icons/ci'
import { MetadataObject } from '~/utils'
import Transition from '../Transition';


interface MetadataPropertyProps{
    metadata: MetadataObject;
    onChange: (index: number, updatedMetadata: MetadataObject) => void;
    onRemove: () => void;
    index: number;

};


export default function MetadataProperty(props: MetadataPropertyProps) {
    const { metadata, onChange, onRemove, index } = props;

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedMetadata:MetadataObject = {
      ...metadata,
      key: e.target.value,
    };
    console.log(index);
    onChange(index, updatedMetadata);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedMetadata:MetadataObject = {
      ...metadata,
      value: e.target.value,
    };
    onChange(index, updatedMetadata);
  };


    return (
        <Transition animation={"fadeMove"} isAppear={true} timeout={400} direction="right">
            <div id="metadata-box" className="mb-6">
                <div className="flex justify-between items-center">
                    <input
                        type="text"
                        className="w-1/3 focus:outline-none focus:border-white focus:ring-white  bg-fog-1 border border-fog-1 px-6  py-3 rounded-lg font-light text-white placeholder:text-white"
                        placeholder="Property name"   
                        onChange={handleKeyChange}
                    />
                    <input
                        type="text"
                        className="mx-3 w-2/3 focus:outline-none focus:border-white focus:ring-white  bg-fog-1 border border-fog-1 px-6  py-3 rounded-lg font-light text-white placeholder:text-white"
                        placeholder="Property value"
                         onChange={handleValueChange}
                    />
                    <div className="asset-btn-remove cursor-pointer" title="Remove" onClick={onRemove}>
                        <CiCircleRemove size={"2.2em"} color="#e74f4e" className="hover:scale-110" />
                    </div>
                </div>
            </div>
        </Transition>
    )
}
