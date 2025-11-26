import { useState, useRef, useEffect } from "react";
import parse from "html-react-parser";
import { useTranslation } from "react-i18next";

const ProductDescription = ({ description }: { description: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [height, setHeight] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation("productPage")

    useEffect(() => {
        if (contentRef.current) {
            setHeight(contentRef.current.scrollHeight);
        }
    }, [description]);
    if (height > 150) {
        return (
            <div className="relative">
                <h2 className="text-center text-2xl mb-2">{t("description")}</h2>
                <div
                    style={{
                        maxHeight: isOpen ? `${height}px` : "80px",
                        transition: "max-height 0.4s ease",
                        overflow: "hidden",
                        position: "relative",
                    }}
                >
                    <div className="container" ref={contentRef}>{parse(description)}</div>

                    {/* 👇 The shadow goes *inside* the same container */}
                    {!isOpen && (
                        <div
                            className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
                            style={{
                                background:
                                    "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))",
                            }}
                        ></div>
                    )}
                </div>

                {/* Toggle Button */}
                <p
                    className="underline font-bold cursor-pointer mt-2 text-center select-none"
                    onClick={() => setIsOpen(open => !open)}
                >
                    {isOpen ? "View Less" : "View More"}
                </p>
            </div>
        );
    }

    return (
        <div className="container">
            <h2 className="text-center text-2xl mb-2">{t("description")}</h2>

            <div ref={contentRef}>{parse(description)}</div>
        </div>
    );

};

export default ProductDescription;
