import classNames from "classnames";
import { FC, useState } from "react";

import FileExplorer from "@/components/file-explorer";

import { SectionImage } from "./image";
import { SectionText } from "./text";
import { useBuilderContext } from "../../context";
import { ContentToolbar } from "../../toolbar";
// import { IconImage } from "../../toolbar/icons";
import { Block } from "../../types";

interface Props {
  row?: Block;
  columns: number;
  rowIndex: number;
  colIndex: number;
}
export const Cell: FC<Props> = ({ row, columns, rowIndex, colIndex }) => {
  const { preview, updateCell } = useBuilderContext();
  const [fileExplorerOpen, setFileExplorerOpen] = useState(false);
  const [formats, setFormats] = useState(
    "h1 h2 | fontfamily fontsize alignleft aligncenter alignright | blockquote | forecolor",
  );
  const item = row?.data[colIndex];
  const isText = item?.type === "text";
  const isImage = item?.type === "image";
  const isFirstRow = rowIndex === 0;

  const [editorOpen, setEditorOpen] = useState(isText || columns === 1);

  return (
    <div
      className={classNames(
        "relative flex w-full justify-center align-middle",
        "row-" + rowIndex,
      )}
      style={{ backgroundColor: item?.bgColor }}
      onClick={() => setEditorOpen(isText || columns === 1)}
    >
      {!preview && (
        <ContentToolbar
          setEditorOpen={(visible) => {
            setFormats(
              "h1 h2 | fontsize fontfamily alignleft aligncenter alignright | blockquote | forecolor",
            );
            setEditorOpen(visible);
          }}
          editorOpen={editorOpen}
          item={item}
          setFileExplorerOpen={setFileExplorerOpen}
          rowIndex={rowIndex}
          colIndex={colIndex}
          onBgColorChange={(color) =>
            updateCell(
              {
                bgColor: color,
                type: "text",
              },
              rowIndex,
              colIndex,
            )
          }
        />
      )}
      <div className="w-full">
        {isText && !isFirstRow && (
          <SectionText
            columns={columns}
            item={item}
            editable={!isFirstRow}
            setEditorOpen={() => {
              setFormats(
                "h1 h2 | fontsize fontfamily alignleft aligncenter alignright | blockquote | forecolor",
              );
              setEditorOpen(true);
            }}
            position={[rowIndex, colIndex]}
            cover={row?.cover}
            formats={formats}
          />
        )}
        {(isImage || isFirstRow) && (
          <SectionImage
            item={item}
            columns={columns}
            position={[rowIndex, colIndex]}
            formats={formats}
            editable={isFirstRow}
            cover={row?.cover}
            setFileExplorerOpen={setFileExplorerOpen}
            setEditorOpen={() => {
              setFormats(
                "h1 h2 | fontsize_formats fontfamily alignleft aligncenter alignright | blockquote | forecolor",
              );
              setEditorOpen(true);
            }}
          />
        )}
      </div>
      <FileExplorer
        multi={true}
        isVisible={!!fileExplorerOpen}
        handleCancel={() => setFileExplorerOpen(false)}
        onInsert={(image) => {
          setFileExplorerOpen(false);
          const { src, width, height, caption } = image[0];
          updateCell(
            {
              image: { src, width, height, description: caption },
              type: "image",
            },
            rowIndex,
            colIndex,
          );
        }}
      />
    </div>
  );
};