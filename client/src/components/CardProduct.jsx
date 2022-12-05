import React from "react";
import {
	GridItem,
	Heading,
	Image,
	Stack,
	Text,
	Button,
	Tag,
	Flex,
	Divider,
} from "@chakra-ui/react";
import { Card, CardBody, CardFooter } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function CardProduct({ id, img, name, price, category }) {
	return (
		<>
			<GridItem colSpan={1}>
				<Card
					transition={"0.2s"}
					h={"400"}
					maxW={"400"}
					_hover={{
						boxShadow: "0 10px 18px 0 rgba(0, 0, 0, 0.2)",
						transform: "scale(1.02)",
					}}
					/* overflow={"hidden"} */
				>
					<CardBody>
						<Flex
							borderRadius={"lg"}
							h={"220"}
							w={"400"}
							justifyContent={"center"}
							alignItems={"center"}
						>
							<Image
								src={img}
								alt="product show"
								height={"100%"}
								width={"100%"}
								objectFit={"contain"}
							/>
						</Flex>
						<Stack spacing={"3"}>
							<Heading
								whiteSpace={"nowrap"}
								textOverflow={"ellipsis"}
								overflow={"hidden"}
								size={"md"}
							>
								{name}
							</Heading>
							{/* <Text size={"sm"}>{description}</Text> */}
							<Tag w={"fit-content"}>{category}</Tag>
						</Stack>
					</CardBody>
					<Divider />
					<CardFooter alignItems={"center"}>
						{/* <HStack spacing={"3"}> */}
						<Text marginRight={"13"} color="teal" fontSize="3xl">
							{"$" + price}
						</Text>
						<Link to={`/detail/${id}`}>
							<Button size={"md"} colorScheme={"teal"}>
								Detalle
							</Button>
						</Link>
						{/* </HStack> */}
					</CardFooter>
				</Card>
			</GridItem>
		</>
	);
}
