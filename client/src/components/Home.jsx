import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	Checkbox,
	Grid,
	GridItem,
	Spinner,
	Stack,
	CheckboxGroup,
	Box,
	Text,
	Flex,
	Input,
	HStack,
	IconButton,
} from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";
import CardProduct from "./CardProduct";
import Pagination from "./Pagination";
import {
	getProducts,
	orderByNames,
	orderByPrices,
	filterByCategory,
	filterByMaterials
} from "../redux/actions";

export default function Home() {
	//redux
	const dispatch = useDispatch();
	const products = useSelector((state) => state.products.products);
	//change
	//console.log(products);

	//Logica de paginaton
	const [currentPage, setCurrentPage] = useState(1);
	const productsPerPage = 9;
	const indexLastProduct = currentPage * productsPerPage;
	const indexFirstProduct = indexLastProduct - productsPerPage;
	const currentProducts = products.slice(indexFirstProduct, indexLastProduct);
	const pagination = (page) => {
		setCurrentPage(page);
	};

	//logica de checkBoxes (antigua)
	/* const [check, setCheck] = useState({});

	const orderByCategory = (array, check) => {
		console.log(check);
		if (check.checked) {
			let res = array.filter((f) => f.category.toLowerCase() === check.value);
			console.log(res, check);
			return res.slice(indexFirstProduct, indexLastProduct);
		} else {
			return array.slice(indexFirstProduct, indexLastProduct);
		}
	};

	const handlerCheck = (e) => {
		const { value, checked } = e.target;
		if (value) {
			setCheck({ value, checked });
		}
	}; */
	//logica de checkBoxes
	const handleSortbyName = (e) => {
		dispatch(orderByNames(e.target.value));
		setCurrentPage(1);
	};
	const handleFilterByCategory = (e) => {
		console.log(e.target.value);
		dispatch(filterByCategory(e.target.value));
		setCurrentPage(1);
	};
	const handleSortbyPrice = (e) => {
		dispatch(orderByPrices(e.target.value));
		setCurrentPage(1);
	};
	const handleFilterByMaterial = (e)=> {
		console.log(e.target.value)
		dispatch(filterByMaterials(e.target.value));
		setCurrentPage(1);
	}
	//info de nuestra db https://e-commerce-production-d476.up.railway.app/products
	useEffect(() => {
		setTimeout(() => {
			dispatch(getProducts());
		}, 1200);
	}, [dispatch]);

	return (
		<>
			<Grid
				h={"1000px"}
				gridTemplateRows="repeat(3,1fr)"
				gridTemplateColumns="repeat(4,1fr)"
				gap={5}
				padding="10"
				paddingTop={"10"}
			>
				<GridItem rowSpan={3} colSpan={1}>
					<Box borderWidth="1px" borderRadius="lg" p={4}>
						<Box paddingBottom={4}>
							<HStack paddingBottom={5}>
								<Input size={"md"} />
								<IconButton
									colorScheme={"teal"}
									aria-label="Search database"
									icon={<BiSearch />}
								/>
							</HStack>
							<Text textAlign={"center"} fontWeight="semibold">
								Ordenar
							</Text>
							<CheckboxGroup /* defaultValue={"A-Z"} */ colorScheme="teal">
								<Stack spacing={[1, 5]} direction={["column"]}>
									<Checkbox onChange={handleSortbyName} value="A-Z">
										A-Z
									</Checkbox>
									<Checkbox onChange={handleSortbyName} value="Z-A">
										A-Z
									</Checkbox>
									<Checkbox onChange={handleSortbyPrice} value="-precio">
										Menor precio
									</Checkbox>
									<Checkbox onChange={handleSortbyPrice} value="+precio">
										Mayor precio
									</Checkbox>
								</Stack>
							</CheckboxGroup>
						</Box>

						{/* <Text textAlign={"center"} fontWeight="semibold">
							Categoria:
						</Text>
						<CheckboxGroup colorScheme="teal">
							<Stack spacing={[1, 5]} direction={["column"]}>
								<CheckboxGroup colSpan="auto" colorScheme="teal">
									<Stack spacing={[1, 5]} direction={"column"}>
										<Checkbox onChange={handlerCheck} value="bombilla">
											Bombilla
										</Checkbox>
										<Checkbox onChange={handlerCheck} value="mate">
											Mate
										</Checkbox>
										<Checkbox onChange={handlerCheck} value="yerba">
											Yerba
										</Checkbox>
										<Checkbox onChange={handlerCheck} value="kit">
											Kit
										</Checkbox>
									</Stack>
								</CheckboxGroup>
							</Stack>
						</CheckboxGroup> */}

						{/*dejo el filtro de abajo ya que soluciona por ahora la paginación automaticamente*/}

						<Text textAlign={"center"} fontWeight="semibold">
							{"Categoria"}
						</Text>
						<Stack spacing={[1, 5]} direction={["column"]}>
							<CheckboxGroup
								colSpan="auto"
								colorScheme="teal"
								/* defaultValue={"all"} */
							>
								<Stack spacing={[1, 5]} direction={"column"}>
									<Checkbox onChange={handleFilterByCategory} value="all">
										Todos
									</Checkbox>
									<Checkbox onChange={handleFilterByCategory} value="mate">
										Mate
									</Checkbox>
									<Checkbox onChange={handleFilterByCategory} value="yerba">
										Yerba
									</Checkbox>
									<Checkbox onChange={handleFilterByCategory} value="bombilla">
										Bombilla
									</Checkbox>
									<Checkbox onChange={handleFilterByCategory} value="kit">
										Kit
									</Checkbox>
								</Stack>
							</CheckboxGroup>
						</Stack>
						<Text textAlign={"center"} fontWeight="semibold">
							{"Material"}
						</Text>
						<Stack spacing={[1, 5]} direction={["column"]}>
							<CheckboxGroup
								colSpan="auto"
								colorScheme="teal"
								/* defaultValue={"all"} */
							>
								<Stack spacing={[1, 5]} direction={"column"}>
									<Checkbox onChange={handleFilterByMaterial} value="all">
										Todos
									</Checkbox>
									<Checkbox onChange={handleFilterByMaterial} value="Industrial">
										Industrial
									</Checkbox>
									<Checkbox onChange={handleFilterByMaterial} value="Artesanal">
										Artesanal
									</Checkbox>
									<Checkbox onChange={handleFilterByMaterial} value="Sintetico">
										Sintetico
									</Checkbox>
								</Stack>
							</CheckboxGroup>
						</Stack>
					</Box>
				</GridItem>
				{currentProducts.length !== 0 ? (
					currentProducts.map((p) => {
						return (
							<div key={p.id}>
								<CardProduct
									id={p.id}
									img={p.image}
									name={p.title}
									price={p.price}
									category={p.category}
									material={p.material}
								/>
							</div>
						);
					})
				) : (
					<GridItem colStart={2} colEnd={5} rowStart={1} rowEnd={4}>
						<Flex h={"1000px"} justifyContent={"center"} alignItems="center">
							<Spinner color="teal" alignSelf={"center"} size={"xl"} />
						</Flex>
					</GridItem>
				)}
				<Pagination
					pagination={pagination}
					productsPerPage={productsPerPage}
					allProducts={products.length}
				/>
			</Grid>
		</>
	);
}
