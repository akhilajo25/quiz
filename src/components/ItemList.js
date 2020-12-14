import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import he from 'he';
import Modal from 'react-modal';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { itemsFetchData } from '../actions/items';
import { getRandomNumber } from '../utils/getRandomNumber';
import { Right } from 'react-bootstrap/lib/Media';
class ItemList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          quizData: [],
          quizOptions:[],
          visibleStartQuiz:'',
          visibleNext:'none',
          questionNo:0,
          visibleScore:'none',
          correct_option:'',
          disabled_value:'',
          display_correct_option:'none',
          score:0,
          isOpen:false,
          quizInvisible:''
        
        };
        this.setData = this.setData.bind(this);
      }
    componentDidMount() {
        
        console.log(this.props.fetchData('https://opentdb.com/api.php?amount=10'));
    }

	closeModal(){
		this.setState({
			isOpen:false
		});
	}
    setData = () => {
        
        /* console.log(this.state.visibleStartQuiz)
        if(this.state.visibleStartQuiz==='none'){ */
            console.log("Start quiz hidden!")
            const question = this.props.items.results[this.state.questionNo];
            const correct_answer = this.props.items.results[this.state.questionNo].correct_answer;
            const incorrect_answers = this.props.items.results[this.state.questionNo].incorrect_answers;
        
            console.log(question)
            
        /* } */
       /*  console.log(i)
        const incorrect_answers=this.props.items.results[i].incorrect_answers;
        const correct_answer=this.props.items.results[i].correct_answer; */
        /* 
        const quizData = results;
        console.log(this.state)
        const { questionIndex } = this.state;
        const outPut = getRandomNumber(0, 3);
        const options = [...quizData[questionIndex].incorrect_answers];
        options.splice(outPut, 0, quizData[questionIndex].correct_answer);
   */ 
         
        const outPut = getRandomNumber(0, 3);
        const options=[...incorrect_answers]; 
        console.log(options.splice(outPut, 0,correct_answer));
        console.log(options); 
        this.setState({
            quizData:question,
            quizOptions:options,
            correct_option:correct_answer
        })
        /* this.setState({ quizData:options}); */

    }
    handleStartQuiz(){
        this.setState({ visibleStartQuiz:'none',visibleNext:''});
        this.handleNext();
    }
    handleNext(){
        let i=this.state.questionNo;
        i++;
        if(i<=10){
        console.log(i)
        this.setState({
            disabled_value:'',
            questionNo:i,
            display_correct_option:'none'
        })
        this.setData();
    }else{
    this.setState({
        visibleScore:'',
        visibleNext:'none',
        display_correct_option:'none',
        quizInvisible:'none'
    })
    }
    
    }
    handleScore(a){
        let s=this.state.score;
        this.setState({
            disabled_value:'true',
            display_correct_option:''
        })
        console.log(a);
        if(this.state.correct_option===a){
            console.log("Right answwer");
            s++;
            console.log("Score is",s);
            this.setState({
                score:s
            })
        }

    }
    handleShowScore(){
        this.setState({
            isOpen:true,
            visibleScore:'none'
        })
    }

    render() {
        const results=this.props.items;
        //console.log(this.state.quizData)
        /* console.log(results);
        this.setData(results); */
        if (this.props.hasError) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }

        return (
            <div style={setMargin}>
               {/*  {this.props.items.results.map((item,i) => (
                    <div >
                        
                            <ListGroup style={setDistanceBetweenItems}>
                                <ListGroupItem header={item.difficulty}>
                                    Q{i}: {item.question}
                                    {this.setData(i)}
                                    <span className="pull-xs-right"  onClick={() => {this.setData(i)}} >Get Options</span>
                                    
                                        {this.state.quizData.map((ic)=>(<button>{ic}</button>))}
                                    
                                </ListGroupItem>
                            </ListGroup>
                                 
                    </div>
                    
                ))} */}

                <button style={{display:this.state.visibleStartQuiz}} onClick={()=>{this.handleStartQuiz()}}>Start Quiz</button>
                <div>
                    <div style={{display:this.state.quizInvisible, fontFamily:'roboto', fontSize:'30'}}>
                    {this.state.quizData.question}
                    {this.state.quizOptions.map((ic)=>(<button style={{ display: 'block',marginBottom:'10px',fontFamily:'roboto', fontSize:'20' }} disabled={this.state.disabled_value} onClick={()=>{this.handleScore(ic)}}>{ic}</button>))}
                    </div>
                    <span style={{display:this.state.display_correct_option,fontFamily:'roboto', fontSize:'20'}}>Correct Answer:{this.state.correct_option}</span>

                </div>
                <button style={{display:this.state.visibleNext}} onClick={()=>{this.handleNext()}}>Next</button>
             <button style={{display:this.state.visibleScore}} onClick={()=>{this.handleShowScore()}}>Score </button>
            <Modal isOpen={this.state.isOpen}
					style={{
						overlay: {
							position: 'absolute',
							top: '250px',
							bottom: '250px',
							left: '50%',
							marginLeft: '50px',
							marginRight: 'auto',
							transform: 'translate(-50%, -0%)',
							backgroundColor: 'rgba(77, 19, 209, 1)',
							border: 'none',
						},
						content: {
							position: 'absolute',
							top: '0px',
							left: '0px',
							right: '0px',
							bottom: '0px',
							background: '#8B008B',
							overflow: 'auto',
							WebkitOverflowScrolling: 'touch',
							padding: '10px',
							border: 'none',
						}
					  }}
					  >
					
					<center><h1>{this.state.score}</h1>
					<button onClick={() => this.closeModal()}>Okay!</button></center>
					</Modal>
            
                
                
                
            </div>
        );
    }
}

var setMargin = {
    padding: "0px 200px 20px 200px"
};

var setDistanceBetweenItems = {
    marginBottom: "5px"
};

ItemList.propTypes = {
    fetchData: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    hasError: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        items: state.items,
        hasError: state.itemsHaveError,
        isLoading: state.itemsAreLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(itemsFetchData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
