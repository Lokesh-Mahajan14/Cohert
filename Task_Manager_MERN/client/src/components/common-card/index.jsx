import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

function CommonCard({
  title,
  description,
  extraTextStyles,
  footerContent,
  content,
  headerRightContent,
}) {
  return (
    <Card
      className="flex flex-col gap-6 rounded-2xl p-8 bg-gray-100 
      transition duration-300 hover:bg-white hover:shadow-2xl 
      hover:shadow-gray-600/10 cursor-pointer w-full max-w-[280px]"
    >
      {/* HEADER */}
      <CardHeader className="p-0">
        <div className="flex justify-between items-start gap-3">
          {title ? (
            <CardTitle
              title={title}
              className={`text-lg font-semibold text-gray-950 
              break-words line-clamp-2 ${
                extraTextStyles ? extraTextStyles : ""
              }`}
            >
              {title}
            </CardTitle>
          ) : null}

          {headerRightContent ? headerRightContent : null}
        </div>

        {description ? (
          <CardDescription className="mt-2 text-gray-600 capitalize">
            {description}
          </CardDescription>
        ) : null}
      </CardHeader>

      {/* CONTENT */}
      {content ? (
        <CardContent className="p-0">{content}</CardContent>
      ) : null}

      {/* FOOTER */}
      {footerContent ? (
        <CardFooter className="p-0">{footerContent}</CardFooter>
      ) : null}
    </Card>
  );
}

export default CommonCard;
